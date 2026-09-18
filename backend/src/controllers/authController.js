const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/database');

const generateTokens = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );

  return { token, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUsers = await query(
      'SELECT id FROM users WHERE email = @email',
      { email }
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const userId = uuidv4();

    await query(
      `INSERT INTO users (id, email, password_hash, first_name, last_name, role, status)
       VALUES (@id, @email, @password, @firstName, @lastName, @role, @status)`,
      {
        id: userId,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'member',
        status: 'active',
      }
    );

    const users = await query(
      'SELECT id, email, first_name, last_name, role FROM users WHERE id = @id',
      { id: userId }
    );

    const user = users[0];
    const { token, refreshToken } = generateTokens(user);

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await query(
      'SELECT id, email, password_hash, first_name, last_name, role, status FROM users WHERE email = @email',
      { email }
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    if (user.status !== 'active') {
      return res.status(401).json({ message: 'Account is inactive' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { token, refreshToken } = generateTokens(user);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

exports.me = async (req, res) => {
  try {
    const users = await query(
      'SELECT id, email, first_name, last_name, role FROM users WHERE id = @id',
      { id: req.user.id }
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load profile', error: error.message });
  }
};
