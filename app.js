const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// PostgreSQL connection
const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'testdb',
});

// Existing route
app.get('/hello', (req, res) => {
  res.send("Hello, World! This is a simple Express server.");
});

// DB route
app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Database connected successfully',
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database error:', error);

    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});