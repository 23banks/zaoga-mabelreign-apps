const { query } = require('../config/database');

const map = (u) => ({
  id: u.id,
  email: u.email,
  firstName: u.first_name,
  lastName: u.last_name,
  role: u.role,
});

exports.getMe = async (req, res) => {
  const users = await query(
    'SELECT id, email, first_name, last_name, role FROM users WHERE id = @id',
    { id: req.user.id }
  );
  if (users.length === 0) return res.status(404).json({ message: 'User not found' });
  res.json(map(users[0]));
};

exports.updateMe = async (req, res) => {
  const { firstName, lastName } = req.body;

  await query(
    'UPDATE users SET first_name = @firstName, last_name = @lastName WHERE id = @id',
    { id: req.user.id, firstName, lastName }
  );

  const users = await query(
    'SELECT id, email, first_name, last_name, role FROM users WHERE id = @id',
    { id: req.user.id }
  );
  res.json(map(users[0]));
};

exports.getAll = async (req, res) => {
  const users = await query(
    'SELECT id, email, first_name, last_name, role, status, created_at FROM users ORDER BY created_at DESC'
  );
  res.json(
    users.map((u) => ({ ...map(u), status: u.status, createdAt: u.created_at }))
  );
};

exports.updateRole = async (req, res) => {
  const { role } = req.body;
  if (!['member', 'leader', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  await query('UPDATE users SET role = @role WHERE id = @id', { id: req.params.id, role });

  const users = await query(
    'SELECT id, email, first_name, last_name, role FROM users WHERE id = @id',
    { id: req.params.id }
  );
  if (users.length === 0) return res.status(404).json({ message: 'User not found' });
  res.json(map(users[0]));
};
