// Change Log: Adapted from API routes. Added auth middleware, GET/POST. No changes this update.

const express = require('express');
const jwt = require('jsonwebtoken');
const Robot = require('../models/Robot');

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', async (req, res) => {
  const { search } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};
  const robots = await Robot.find(query);
  res.json(robots);
});

router.post('/', verifyToken, async (req, res) => {
  const data = req.body;
  const robot = new Robot({ ...data, seller: req.user.userId });
  await robot.save();
  res.status(201).json(robot);
});

module.exports = router;