const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });


exports.signup = async (req, res) => {
const { name, email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ message: 'User already exists' });
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);
const user = await User.create({ name, email, password: hashed });
res.status(201).json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id),
});
};


exports.login = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
res.json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id),
});
};


exports.me = async (req, res) => {
res.json(req.user);
};