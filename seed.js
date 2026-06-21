/**
 * seed.js — run with `node seed.js`
 * Populates the database with sample products and a ready-made
 * admin account so the app has data to show right away.
 */
const bcrypt = require('bcryptjs');
const { load, save, nextId } = require('./db/database');

const data = load();

if (data.products.length === 0) {
  const sampleProducts = [
    {
      name: 'Wireless Headphones',
      description: 'Over-ear Bluetooth headphones with noise cancellation and 20hr battery life.',
      price: 1999,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      stock: 25,
    },
    {
      name: 'Smart Watch',
      description: 'Fitness tracker with heart-rate monitor, step counter and notifications.',
      price: 2999,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      stock: 15,
    },
    {
      name: 'Cotton T-Shirt',
      description: 'Soft 100% cotton round-neck t-shirt, available in multiple colors.',
      price: 399,
      category: 'Clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      stock: 50,
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight running shoes with cushioned sole for everyday training.',
      price: 1499,
      category: 'Footwear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      stock: 30,
    },
    {
      name: 'Backpack',
      description: 'Water-resistant 30L backpack with laptop compartment, great for college.',
      price: 899,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      stock: 20,
    },
    {
      name: 'Coffee Mug',
      description: 'Ceramic 350ml mug, microwave safe, fun print design.',
      price: 199,
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
      stock: 60,
    },
    {
      name: 'Notebook Set (Pack of 3)',
      description: 'A5 ruled notebooks, 100 pages each, perfect for class notes.',
      price: 249,
      category: 'Stationery',
      image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400',
      stock: 40,
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable speaker with deep bass and 10hr playtime, IPX5 splash-proof.',
      price: 1299,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      stock: 18,
    },
  ];

  sampleProducts.forEach((p) => {
    data.products.push({
      id: nextId(data, 'products'),
      ...p,
      createdAt: new Date().toISOString(),
    });
  });

  console.log(`✅ Added ${sampleProducts.length} sample products.`);
} else {
  console.log('ℹ️  Products already exist, skipping product seed.');
}

// seed a default admin account if no users exist yet
if (data.users.length === 0) {
  data.users.push({
    id: nextId(data, 'users'),
    name: 'Admin',
    email: 'admin@shopease.com',
    password: bcrypt.hashSync('admin123', 8),
    role: 'admin',
    createdAt: new Date().toISOString(),
  });
  console.log('✅ Created default admin account -> admin@shopease.com / admin123');
} else {
  console.log('ℹ️  Users already exist, skipping admin seed.');
}

save(data);
console.log('🌱 Seeding complete!');
