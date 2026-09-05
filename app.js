// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// The single route serving the HTML page
app.get('/hello', (req, res) => {
  res.send("Hello, World! This is a simple Express server.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});