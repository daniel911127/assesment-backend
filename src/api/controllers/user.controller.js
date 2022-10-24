const bcrypt = require('bcrypt');
const { sign } = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  async list(req, res) {
    try {
      const user = await User.find();
      res.status(200).json({ message: 'Users founds', data: user });
    } catch (err) {
      res.status(400).json({ message: 'Users not founds', data: err });
    }
  },
  async show(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      res.status(200).json({ message: 'User found', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User not found', data: err });
    }
  },
  async create(req, res) {
    try {
      const data = req.body;
      const user = await User.create(data);
      res.status(201).json({ message: 'User created', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User not created', data: err });
    }
  },
  async update(req, res) {
    try {
      const data = req.body;
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      res.status(201).json({ message: 'User updated', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User not updated', data: err });
    }
  },
  async destroy(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndDelete(userId);
      res.status(201).json({ message: 'User deleted', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User not deleted', data: err });
    }
  },
  async signup(req, res) {
    try {
      const { email, password } = req.body;

      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ email, password: encPassword });

      console.log('EncPassword', user);

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      console.log('Token:', token);

      res
        .status(201)
        .json({ message: 'User created succesfully', data: { email, token } });
    } catch (err) {
      res.status(400).json({ message: 'User could not creater', error: err });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.find({ email });

      if (!user) {
        throw new Error('credenciales invalidas');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('credenciales invalidas');
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res
        .status(201)
        .json({ message: 'user login succesfully', data: { email, token } });
    } catch (err) {
      res.status(400).json({ message: 'user could not login', error: err });
    }
  },
};
