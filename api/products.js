const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());

let products = [
  { id: 1, name: 'Labial', price: 11000 },
  { id: 2, name: 'Rubor', price: 15000 },
  { id: 3, name: 'Mascarilla', price: 8000 }
];

app.get('/products', (req, res) => res.json(products));
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === +req.params.id);
  product ? res.json(product) : res.status(404).json({ error: 'Not found' });
});
app.post('/products', (req, res) => {
  const { id, name, price } = req.body;
  if (!id || !name || !price || products.some(p => p.id === id)) {
    return res.status(400).json({ error: 'Invalid request' });}
  products.push(req.body);
  res.status(201).json(req.body);
});

module.exports = app;
module.exports.handler = serverless(app);
