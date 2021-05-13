const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/api/userRoute');
const stocksRouter = require('./routes/api/stocksRoute');

const connectDB = require('./dbConnector/db');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: 'https://bitcoin-mern.herokuapp.com/',
    credentials: true,
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

connectDB();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use('/api/users', userRouter);
app.use('/api/stocks', stocksRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`server running in on port ${PORT}`);
});
