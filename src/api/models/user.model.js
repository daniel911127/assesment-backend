const { model, Schema, models } = require('mongoose');

const emailRegex = new RegExp('[a-zA-Z0-9]{5,}@[a-z]{3,5}.com');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: [emailRegex, 'el email no es valido'],
      validate: {
        async validator(email) {
          try {
            const user = await models.user.findOne({ email });
            return !user;
          } catch (err) {
            return false;
          }
        },
        message: 'El correo ya existe',
      },
    },
    password: {
      type: String,
      minlength: [8, 'password muy corto'],
      required: true,
    },
    lists: {
      type: [{ type: Schema.Types.ObjectId, ref: 'list' }],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('user', userSchema);

module.exports = User;
