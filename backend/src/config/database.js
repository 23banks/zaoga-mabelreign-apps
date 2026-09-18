const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableKeepAlive: true,
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
      console.log('Connected to MS SQL Server');

      const result = await pool.request().query('SELECT 1 as connected');
      if (result.recordset[0].connected === 1) {
        console.log('Database connection verified');
      }
    }
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}

async function query(sqlQuery, params = {}) {
  const activePool = await getPool();
  const request = activePool.request();

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }

  const result = await request.query(sqlQuery);
  return result.recordset || [];
}

process.on('exit', async () => {
  if (pool) {
    await pool.close();
  }
});

module.exports = { sql, getPool, query };
