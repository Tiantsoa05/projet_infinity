const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/model');

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password, langue_maternelle, niveau_langue } = req.body;
    const user = new User({ nom, prenom, email, password, langue_maternelle, niveau_langue });
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};