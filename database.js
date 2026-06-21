/**
 * database.js
 * ---------------------------------------------------------
 * A tiny file-based database layer used for this project.
 *
 * NOTE FOR REVIEWERS / FUTURE DEV:
 * This stores data as JSON in db/data.json and mimics simple
 * relational tables (users, products, orders, order_items).
 * It was used here so the app runs anywhere without needing
 * a separately-installed MySQL/PostgreSQL/MongoDB server.
 *
 * To switch to a real database:
 *  - MySQL/Postgres: replace the functions below with
 *    queries using 'mysql2' or 'pg', keeping the same
 *    table/column names used throughout routes/*.js
 *  - MongoDB: replace with 'mongoose' models using the
 *    same field names.
 * ---------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

function defaultData() {
  return {
    users: [],
    products: [],
    orders: [],
    order_items: [],
    _seq: { users: 1, products: 1, orders: 1, order_items: 1 },
  };
}

function load() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData(), null, 2));
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function nextId(data, table) {
  const id = data._seq[table]++;
  return id;
}

module.exports = {
  load,
  save,
  nextId,
};
