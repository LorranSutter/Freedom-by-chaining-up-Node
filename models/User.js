let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
      },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    assets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Asset',
            amount: {
                type: Number,
                default: 0
            },
            selling: {
                type: Boolean,
                default: false
            }
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Asset'
        }
    ]
});

UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
      // Saving reference to this because of changing scopes
      const document = this;
      bcrypt.hash(document.password, saltRounds,
        function(err, hashedPassword) {
          if (err) {
            next(err);
          }
          else {
            document.password = hashedPassword;
            next();
          }
        });
    } else {
      next();
    }
  });

module.exports = mongoose.model('User', UserSchema);