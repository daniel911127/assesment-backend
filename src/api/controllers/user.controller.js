const bcrypt = require('bcrypt');
const { sign } = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  async signup(req, res) {
    try {
      const { email, password } = req.body;

      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ email, password: encPassword });

      console.log('EncPassword', user);

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expireIn: 60 * 60 * 24,
      });

      console.log('Token:', token);

      res
        .status(201)
        .json({ message: 'User created succesfully', data: { email, token } });
    } catch (err) {
      res
        .status(400)
        .json({ token, message: 'User could not creater', error: err });
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
        expireIn: 60 * 60 * 24,
      });
      res
        .status(201)
        .json({ message: 'user login succesfully', data: { email, token } });
    } catch (err) {
      res.status(400).json({ message: 'user could not login', error: err });
    }
  },
};
