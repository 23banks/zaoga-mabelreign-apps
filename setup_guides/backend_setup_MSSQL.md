# ZAOGA Backend Setup - MS SQL Server Version

## Quick Setup (Windows + MS SQL + IIS)

### Step 1: Install Requirements (15 minutes)

**Required Software:**
- [Node.js v18+](https://nodejs.org/) - Download and install
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) - Free edition
- [SQL Server Management Studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) - For database management
- [Visual Studio Code](https://code.visualstudio.com/) - Code editor

### Step 2: Create MS SQL Database (10 minutes)

1. Open **SQL Server Management Studio**
2. Connect to `localhost\SQLEXPRESS`
3. Right-click "Databases" → "New Database"
4. Name: `zaoga_db` → OK
5. Copy and run the SQL script from "MSSQL_IIS_Setup.md" → "Part 1: Create Database"

**Verify:**
```sql
-- Run in SSMS to verify
USE zaoga_db;
SELECT COUNT(*) as TableCount FROM information_schema.TABLES;
-- Should return: 10+ tables
```

### Step 3: Initialize Node.js Project (5 minutes)

```bash
# Create project directory
mkdir zaoga-backend
cd zaoga-backend

# Initialize npm
npm init -y

# Install core dependencies for MS SQL
npm install express cors dotenv mssql jsonwebtoken bcryptjs uuid joi

# Install dev dependencies
npm install --save-dev nodemon

# Create project structure
mkdir src
mkdir src\{routes,controllers,middleware,models,utils,config}
mkdir logs
mkdir uploads
```

### Step 4: Create Configuration Files

**.env**
```env
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# MS SQL Server
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=zaoga_db
DB_USER=zaoga_app
DB_PASSWORD=YourSecurePassword123!

# JWT
JWT_SECRET=your_super_secret_jwt_key_needs_to_be_long_32_chars_or_more
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=your_refresh_secret_also_long_32_chars_or_more
JWT_REFRESH_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./uploads

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_key_optional

# Payments (Stripe)
STRIPE_SECRET_KEY=your_stripe_key_optional
```

**.gitignore**
```
node_modules/
.env
logs/
uploads/
*.log
.DS_Store
dist/
build/
```

**package.json scripts**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"No tests yet\""
  }
}
```

### Step 5: Create Entry Point

**index.js** (Root directory)
```javascript
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🗄️ Database: ${process.env.DB_NAME}`);
  console.log(`\nAPI Health Check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

### Step 6: Create Express App

**src/app.js**
```javascript
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',      // Next.js website
    'http://localhost:3001',      // Alternative
    'http://192.168.1.100:3000',  // Local network
  ],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    database: process.env.DB_NAME,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path,
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
```

### Step 7: Database Connection

**src/config/database.js**
```javascript
const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost\\SQLEXPRESS',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false, // true if using Azure SQL
    trustServerCertificate: true,
    enableKeepAlive: true,
    instanceName: 'SQLEXPRESS',
    connectionTimeout: 30000,
    requestTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 2,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

async function getPool() {
  try {
    if (!pool) {
      pool = new sql.ConnectionPool(config);
      await pool.connect();
      console.log('✅ Connected to MS SQL Server');
      
      // Test connection
      const result = await pool.request().query('SELECT 1 as connected');
      if (result.recordset[0].connected === 1) {
        console.log('✅ Database connection verified');
      }
    }
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

async function query(sqlQuery, params = {}) {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Add named parameters
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }

    const result = await request.query(sqlQuery);
    return result.recordset || [];
  } catch (error) {
    console.error('❌ Query error:', error.message);
    throw error;
  }
}

async function executeProcedure(procedureName, params = {}) {
  try {
    const pool = await getPool();
    const request = pool.request();

    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }

    const result = await request.execute(procedureName);
    return result;
  } catch (error) {
    console.error('❌ Procedure execution error:', error.message);
    throw error;
  }
}

// Graceful shutdown
process.on('exit', async () => {
  if (pool) {
    await pool.close();
  }
});

module.exports = { getPool, query, executeProcedure };
```

### Step 8: Authentication Middleware

**src/middleware/auth.js**
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

const leaderMiddleware = (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'leader')) {
    return res.status(403).json({ message: 'Leader access required' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, leaderMiddleware };
```

### Step 9: Error Handler

**src/middleware/errorHandler.js**
```javascript
const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const path = req.path;
  const method = req.method;

  console.error(`[${timestamp}] ${method} ${path}`);
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      path,
      method,
      timestamp,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
```

### Step 10: Routes Setup

**src/routes/index.js**
```javascript
const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const sermonRoutes = require('./sermons');
const eventRoutes = require('./events');
const prayerRoutes = require('./prayers');

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/sermons', sermonRoutes);
router.use('/events', eventRoutes);
router.use('/prayer-requests', prayerRoutes);

// Version info
router.get('/', (req, res) => {
  res.json({
    name: 'ZAOGA FIF API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
  });
});

module.exports = router;
```

### Step 11: Authentication Routes

**src/routes/auth.js**
```javascript
const express = require('express');
const authController = require('../controllers/authController');
const { validate } = require('../utils/validators');
const { schemas } = require('../utils/validators');

const router = express.Router();

router.post('/register', validate(schemas.userRegister), authController.register);
router.post('/login', validate(schemas.userLogin), authController.login);
router.post('/logout', authController.logout);

module.exports = router;
```

### Step 12: Authentication Controller

**src/controllers/authController.js**
```javascript
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

    // Check if user exists
    const existingUsers = await query(
      'SELECT id FROM users WHERE email = @email',
      { email }
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userId = uuidv4();

    // Insert user
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

    // Get user
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
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Registration failed',
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const users = await query(
      'SELECT id, email, password_hash, first_name, last_name, role, status FROM users WHERE email = @email',
      { email }
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(401).json({ message: 'Account is inactive' });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate tokens
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
    res.status(500).json({
      message: 'Login failed',
      error: error.message,
    });
  }
};

exports.logout = (req, res) => {
  // Token is stateless, so logout is just client-side
  res.json({ message: 'Logout successful' });
};
```

### Step 13: Test Everything

```bash
# Start server
npm run dev

# Should see:
# ✅ Server running on port 5000
# ✅ Connected to MS SQL Server
# ✅ Database connection verified
# 📍 Environment: development
# 🗄️ Database: zaoga_db
```

### Step 14: Test Health Endpoint

```bash
# In another terminal, test the API
curl http://localhost:5000/health

# Should return:
# {"status":"OK","timestamp":"2024-01-15T10:30:45.123Z","environment":"development","database":"zaoga_db"}
```

### Step 15: Test Registration Endpoint

```bash
# Test registration
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@zaoga.church",
    "password": "SecurePassword123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Should return a token
```

---

## Project Structure Checklist

```
✅ zaoga-backend/
  ✅ src/
    ✅ config/
      ✅ database.js
    ✅ middleware/
      ✅ auth.js
      ✅ errorHandler.js
    ✅ controllers/
      ✅ authController.js
    ✅ routes/
      ✅ index.js
      ✅ auth.js
    ✅ utils/
      ✅ validators.js
    ✅ app.js
  ✅ index.js
  ✅ .env
  ✅ .gitignore
  ✅ package.json
  ✅ logs/
  ✅ uploads/
```

---

## Next Steps

1. ✅ Create other controllers (sermons, events, prayers)
2. ✅ Create routes for each resource
3. ✅ Add validation for each endpoint
4. ✅ Add unit tests
5. ✅ Deploy to IIS (see MSSQL_IIS_Setup.md)

---

## Useful MS SQL Commands

```sql
-- Check all databases
SELECT name FROM sys.databases;

-- Check tables in zaoga_db
USE zaoga_db;
SELECT name FROM sys.tables;

-- Check user permissions
SELECT * FROM sys.database_role_members;

-- View user logins
SELECT name FROM sys.sysusers;

-- Backup database
BACKUP DATABASE zaoga_db TO DISK = 'C:\Backups\zaoga_db.bak';
```

You're ready to start building! 🚀
