// Change Log: 
// - Initial creation: Added CRUD routes for parts. Includes get all, get by ID, create (auth required), update (auth), delete (auth). Uses JWT for auth middleware (assuming it's implemented in auth.js or similar). Mirrors robots.js structure for consistency.

const express = require('express');
const jwt = require('jsonwebtoken');
const Part = require('../models/Part');

const router = express.Router();

// Middleware to verify JWT (assume this is shared or from auth.js)
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Get all parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find().populate('seller', 'name');
    res.json(parts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get part by ID
router.get('/:id', async (req, res) => {
  try {
    const part = await Part.findById(req.params.id).populate('seller', 'name');
    if (!part) return res.status(404).json({ msg: 'Part not found' });
    res.json(part);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create part (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const part = new Part({ ...req.body, seller: req.user.id });
    await part.save();
    res.status(201).json(part);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Update part (auth required, owner only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ msg: 'Part not found' });
    if (part.seller.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    Object.assign(part, req.body);
    await part.save();
    res.json(part);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Delete part (auth required, owner only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ msg: 'Part not found' });
    if (part.seller.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    await part.remove();
    res.json({ msg: 'Part deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;