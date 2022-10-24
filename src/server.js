require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database');
const userRouter = require('./api/routes/user.route');
const listRouter = require('./api/controllers/list.controller');
const itemRouter = require('./api/controllers/item.controller');

const port = process.env.PORT || 8080;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth/local', userRouter);
app.use('/users', userRouter);
app.use('/list', listRouter);
//app.use('/item', itemRouter);

app.listen(8080, () => {
  console.log(`App running ok at http://localhost:${port}`);
});
