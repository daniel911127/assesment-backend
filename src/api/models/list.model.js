const { model, Schema } = require('mongoose');

const listSchema = new Schema(
  {
    title: String,
    description: String,
    enlace: String,
  },
  { timestamps: true }
);
