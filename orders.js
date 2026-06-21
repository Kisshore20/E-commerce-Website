const express = require('express');
const { load, save, nextId } = require('../db/database');
const { authRequired, adminRequired } = require('../middleware/auth');

const router = express.Router();

// PLACE ORDER (checkout) - logged in users only
router.post('/', authRequired, (req, res) => {
  const { items, address } = req.body; // items: [{productId, qty}]

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }
  if (!address || !address.trim()) {
    return res.status(400).json({ error: 'Shipping address is required.' });
  }

  const data = load();
  let total = 0;
  const orderItemsDetailed = [];

  for (const item of items) {
    const product = data.products.find((p) => p.id === parseInt(item.productId));
    if (!product) {
      return res.status(400).json({ error: `Product with id ${item.productId} not found.` });
    }
    const qty = parseInt(item.qty) || 1;
    if (product.stock < qty) {
      return res.status(400).json({ error: `Not enough stock for "${product.name}". Only ${product.stock} left.` });
    }
    total += product.price * qty;
    orderItemsDetailed.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
    });
  }

  // reduce stock
  for (const item of orderItemsDetailed) {
    const product = data.products.find((p) => p.id === item.productId);
    product.stock -= item.qty;
  }

  const newOrder = {
    id: nextId(data, 'orders'),
    userId: req.user.id,
    userName: req.user.name,
    items: orderItemsDetailed,
    total: parseFloat(total.toFixed(2)),
    address,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  data.orders.push(newOrder);
  save(data);

  res.json({ message: 'Order placed successfully!', order: newOrder });
});

// GET MY ORDERS (logged in user)
router.get('/my-orders', authRequired, (req, res) => {
  const data = load();
  const myOrders = data.orders
    .filter((o) => o.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(myOrders);
});

// GET ALL ORDERS (admin only)
router.get('/', authRequired, adminRequired, (req, res) => {
  const data = load();
  const allOrders = [...data.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(allOrders);
});

// UPDATE ORDER STATUS (admin only)
router.put('/:id/status', authRequired, adminRequired, (req, res) => {
  const { status } = req.body;
  const allowed = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}` });
  }

  const data = load();
  const order = data.orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  order.status = status;
  save(data);
  res.json({ message: 'Order status updated!', order });
});

module.exports = router;
