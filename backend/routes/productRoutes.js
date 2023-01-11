import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/search', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/search/:genre/:store', async (req, res) => {
  let groupby =[];
  let product = [];
  if (req.params.store === "all" && req.params.genre === "all") {
    product = await Product.find();
  }
  else if (req.params.store !== "all" && req.params.genre !== "all") {
    product = await Product.find({ "genre": req.params.genre,"store": req.params.store });
  }
  else if (req.params.genre !== "all") {
    product = await Product.find({ "genre": req.params.genre })
  }
  else if (req.params.store !== "all") {
    product = await Product.find({ "store": req.params.store });
  }

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
