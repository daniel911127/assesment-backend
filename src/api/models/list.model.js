const { model, Schema } = require('mongoose');

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [15, 'titulo muy largo'],
      minlength: [4, 'titulo muy corto'],
    },
    description: {
      type: String,
      required: true,
    },
    enlace: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    item: {
      type: [{ type: Schema.Types.ObjectId, ref: 'item' }],
      required: false,
    },
  },
  { timestamps: true }
);

const List = model('list', listSchema);

module.exports = List;
