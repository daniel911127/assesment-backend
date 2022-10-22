require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database');
const userRouter = require('./api/routes/user.route');

const port = process.env.PORT || 8080;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth/local', userRouter);

app.listen(8080, () => {
  console.log(`App running ok at http://localhost:${port}`);
});
