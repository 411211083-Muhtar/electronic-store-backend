const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get all products
  router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  // Get product by id
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('Getting product by ID:', id);  // Debugging line
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error getting product by ID:', err);  // Debugging line
        return res.status(500).json({ error: err.message });
      }
      console.log('Results:', results);  // Debugging line
      if (results.length === 0) {
        console.log('Product not found');  // Debugging line
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(results[0]);
    });
  });

  // Create new product
  router.post('/', (req, res) => {
    const { name, description, price, quantity } = req.body;
    db.query('INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)', [name, description, price, quantity], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: results.insertId, name, description, price, quantity });
    });
  });

  // Update product by id
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    db.query('UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?', [name, description, price, quantity, id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, name, description, price, quantity });
    });
  });

  // Delete product by id
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Product deleted' });
    });
  });

  return router;
};
