require('dotenv').config();
const express = require('express');
const { connect } = require('./database');

const app = express();
const port = 8080;
connect();
//midldeware
app.use(express.json());
//rutes-endpoints

app.listen(8080, () => {
  console.log(`App running ok at http://localhost:${port}`);
});
