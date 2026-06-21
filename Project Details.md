# ShopEase - Full Stack E-Commerce Web Application

## Project Overview

ShopEase is a full-stack e-commerce web application that provides a complete online shopping experience. The application allows customers to browse products, add items to their cart, place orders, and track order status. It also includes an admin panel for managing products and customer orders.

This project demonstrates full-stack web development concepts such as authentication, REST API development, role-based authorization, and database management.

---

## Features

### Customer Features
- User Registration and Login
- Browse Products
- Search Products
- Filter Products by Category
- Add to Cart
- Update or Remove Cart Items
- Secure Checkout
- View Order History
- Track Order Status

### Admin Features
- Admin Dashboard
- Add New Products
- Edit Product Details
- Delete Products
- Manage Customer Orders
- Update Order Status

### Security Features
- JWT Authentication
- Password Encryption using bcrypt
- Role-Based Access Control
- Protected API Routes

---

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Authentication
- JSON Web Token (JWT)
- bcrypt.js

### Database
- JSON File Storage

---

## Project Structure

```text
ShopEase/
│── server.js
│── seed.js
│── package.json
│── db/
│   ├── database.js
│   └── data.json
│── middleware/
│   └── auth.js
│── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
│── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── cart.html
│   ├── my-orders.html
│   ├── admin.html
│   ├── style.css
│   └── app.js
│── README.md
│── PROJECT_DETAILS.md
```

---

## Objectives

- Build a secure full-stack e-commerce application.
- Implement RESTful APIs.
- Provide authentication and authorization.
- Manage products and orders efficiently.
- Deliver a responsive user experience.

---

## Installation

### Prerequisites
- Node.js
- npm

### Steps

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/shopease.git
```

2. Install dependencies

```bash
npm install
```

3. Seed sample data

```bash
node seed.js
```

4. Start the server

```bash
node server.js
```

5. Open your browser

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/products | Get Products |
| POST | /api/products | Add Product |
| PUT | /api/products/:id | Update Product |
| DELETE | /api/products/:id | Delete Product |
| POST | /api/orders | Place Order |
| GET | /api/orders/my-orders | View My Orders |
| GET | /api/orders | View All Orders |
| PUT | /api/orders/:id/status | Update Order Status |

---

## Future Enhancements

- Online Payment Gateway
- Product Reviews and Ratings
- Wishlist
- Image Upload
- Email Notifications
- AI Product Recommendations
- MySQL / MongoDB Integration

---

## Author

**Kisshore N**

Developed as a Full Stack Web Development Project demonstrating REST APIs, Authentication, Authorization, Database Management, and Responsive Web Design.
