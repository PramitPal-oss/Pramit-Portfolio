const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const clientRouter = require('./router/client');
const cors = require('cors');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());

app.use(express.json());

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABSE_PASSWORD
);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(DB, connectionParams)
  .then(() => console.log('connected to the database'))
  .catch((err) =>
    console.log(`Error connecting to the database. ${err.message} `)
  );

app.use('/api/v1', clientRouter);

app.listen(process.env.PORT, () =>
  console.log(`Your server is live on ${process.env.PORT}`)
);
