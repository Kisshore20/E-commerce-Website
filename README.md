# ShopEase — Mini E-Commerce Web App

A basic online store built as a student-style mini project.

## Features
- Product catalog with search & category filter
- Add to cart, view cart, edit quantities, checkout
- User registration/login with JWT auth
- Role-based access: **Admin** vs **User**
- Admin panel: add/edit/delete products, view & update order status
- User panel: view personal order history
- REST API backend for products & orders
- Database integration (see note below)

## Tech Stack
- **Backend:** Node.js + Express
- **Frontend:** Plain HTML, CSS, JavaScript (no framework — easy to read/explain)
- **Auth:** JWT (jsonwebtoken) + bcrypt password hashing
- **Database:** File-based JSON "database" (`db/data.json`) accessed through
  `db/database.js`. It's used here so the project runs instantly with zero
  external setup — but it mimics simple relational tables (`users`,
  `products`, `orders`) so it's easy to swap for a real database:
  - **MySQL/PostgreSQL:** replace `db/database.js` with `mysql2`/`pg` queries,
    keeping the same table & field names already used in `routes/*.js`.
  - **MongoDB:** replace with Mongoose models using the same field names.

## Project Structure
```
shopease/
├── server.js              # Express app entry point
├── seed.js                 # Seeds sample products + admin account
├── db/
│   ├── database.js         # JSON file "database" layer
│   └── data.json           # generated data (created on first run)
├── middleware/
│   └── auth.js             # JWT verification + admin check
├── routes/
│   ├── auth.js              # register / login
│   ├── products.js          # product CRUD + catalog
│   └── orders.js             # checkout + order tracking
└── public/                  # frontend
    ├── index.html            # product catalog (home page)
    ├── login.html
    ├── register.html
    ├── cart.html
    ├── my-orders.html
    ├── admin.html            # admin panel
    ├── style.css
    └── app.js                # shared frontend logic
```

## How to Run

1. Install dependencies:
   ```
   npm install
   ```
2. Seed the database with sample products + a default admin account:
   ```
   node seed.js
   ```
3. Start the server:
   ```
   node server.js
   ```
4. Open your browser at:
   ```
   http://localhost:3000
   ```

## Demo Accounts
- **Admin:** `admin@shopease.com` / `admin123`
- Or just register a new account — the first ever registered user
  automatically becomes admin; everyone after that is a normal user.

## Notes
- Cart data is stored in the browser's `localStorage` until checkout.
- JWT tokens are stored in `localStorage` and sent via `Authorization: Bearer <token>` headers.
- This is a learning/demo project — for production use you'd want HTTPS,
  stronger secret management (the JWT secret is hardcoded for simplicity),
  and a real database.
