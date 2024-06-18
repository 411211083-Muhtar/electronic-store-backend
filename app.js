const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const productsRouter = require('./routes/products');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // ganti dengan username MySQL Anda
  password: '', // ganti dengan password MySQL Anda
  database: 'electronic_store'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productsRouter(db));

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
