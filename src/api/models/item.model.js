const { model, Schema } = require('mongoose');

const itemSchema = new Schema(
  {
    item: {
      type: String,
      require: true,
      maxlength: [15, 'item muy largo'],
      minlength: [4, 'item muy corto'],
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: 'list',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
