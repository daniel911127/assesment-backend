const List = require('../models/list.model');
const User = require('../models/user.model');
module.exports = {
  async list(req, res) {
    try {
      const list = await List.find();

      res.status(200).json({ message: 'list found', data: list });
    } catch (err) {}
  },
  async show(req, res) {
    try {
      const { listId } = req.params;

      const list = await List.findById(listId);

      res.status(200).json({ message: 'list found', data: list });
    } catch (err) {
      res.status(400).json({ message: 'list not found', data: err });
    }
  },
  async create(req, res) {
    try {
      const { userId } = req.params;
      const data = req.body;

      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not exist');
      }

      const list = await List.create({ ...data, user: userId });
      user.lists.unshift(list);
      await user.save({ validateBeforeSave: false });

      res.status(201).json({ message: 'list created', data: list });
    } catch (err) {
      res.status(400).json({ message: 'list not created', data: err });
    }
  },
  async update(req, res) {
    try {
      const data = req.body;
      const { listId } = req.params;

      const list = await Todo.findByIdAndUpdate(listId, data, { new: true });

      res.status(200).json({ message: 'list updated', data: list });
    } catch (err) {
      res.status(400).json({ message: 'listcould not updated', data: err });
    }
  },
  async destroy(req, res) {
    try {
      const { listId } = req.params;

      const list = await Todo.findByIdAndDelete(listId);

      res.status(200).json({ message: 'Todo delistd', data: todo });
    } catch (error) {
      res.status(400).json({ message: 'Todo could not deleted', data: error });
    }
  },
};
