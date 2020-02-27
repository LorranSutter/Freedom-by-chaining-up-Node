let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
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
            ref: 'Asset'
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Asset'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);