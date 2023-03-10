import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import buyingRouter from './routes/buyingRouter.js'
import bodyParser from 'body-parser';
import cors from 'cors';
mongoose
  .connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/books')
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', buyingRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
