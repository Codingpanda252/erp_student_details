const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const cors = require('cors'); 

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin@123456',
  database: 'erpmait_result'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(cors());

app.get('/data', (req, res) => {
  const query = 'SELECT * FROM result01'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL database:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results); 
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
