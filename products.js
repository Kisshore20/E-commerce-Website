const express = require('express');
const { load, save, nextId } = require('../db/database');
const { authRequired, adminRequired } = require('../middleware/auth');

const router = express.Router();

// GET all products (public) - supports ?search= and ?category=
router.get('/', (req, res) => {
  const data = load();
  let products = data.products;

  const { search, category } = req.query;
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  if (category && category !== 'All') {
    products = products.filter((p) => p.category === category);
  }

  res.json(products);
});

// GET single product
router.get('/:id', (req, res) => {
  const data = load();
  const product = data.products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json(product);
});

// CREATE product (admin only)
router.post('/', authRequired, adminRequired, (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required.' });
  }

  const data = load();
  const newProduct = {
    id: nextId(data, 'products'),
    name,
    description: description || '',
    price: parseFloat(price),
    category: category || 'General',
    image: image || 'https://via.placeholder.com/300x200?text=Product',
    stock: stock !== undefined ? parseInt(stock) : 10,
    createdAt: new Date().toISOString(),
  };
  data.products.push(newProduct);
  save(data);
  res.json({ message: 'Product added!', product: newProduct });
});

// UPDATE product (admin only)
router.put('/:id', authRequired, adminRequired, (req, res) => {
  const data = load();
  const idx = data.products.findIndex((p) => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found.' });

  const { name, description, price, category, image, stock } = req.body;
  const p = data.products[idx];
  if (name !== undefined) p.name = name;
  if (description !== undefined) p.description = description;
  if (price !== undefined) p.price = parseFloat(price);
  if (category !== undefined) p.category = category;
  if (image !== undefined) p.image = image;
  if (stock !== undefined) p.stock = parseInt(stock);

  save(data);
  res.json({ message: 'Product updated!', product: p });
});

// DELETE product (admin only)
router.delete('/:id', authRequired, adminRequired, (req, res) => {
  const data = load();
  const idx = data.products.findIndex((p) => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found.' });

  data.products.splice(idx, 1);
  save(data);
  res.json({ message: 'Product deleted!' });
});

module.exports = router;
