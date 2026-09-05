const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'testdb',
});

app.get('/hello', (req, res) => {
  res.send('Hello, World! This is a simple Express server.');
});

// Add data
app.post('/data', async (req, res) => {
  try {
    const { name, age } = req.body;

    const result = await pool.query(
      'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
      [name, age]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Insert error:', error);

    res.status(500).json({
      message: 'Failed to insert data',
      error: error.message,
    });
  }
});

// Fetch data
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users ORDER BY id'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Fetch error:', error);

    res.status(500).json({
      message: 'Failed to fetch data',
      error: error.message,
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});