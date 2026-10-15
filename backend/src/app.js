const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3400',
    'http://localhost:3001',
  ],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/v1', routes);

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    database: process.env.DB_NAME,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path,
  });
});

app.use(errorHandler);

module.exports = app;
