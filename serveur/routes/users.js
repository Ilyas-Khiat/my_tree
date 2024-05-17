import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const usersrouter = express.Router();
// Register
usersrouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const newUser = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.status(200).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
usersrouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '24h' });
    res.status(200).json({ status: true, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default usersrouter;
