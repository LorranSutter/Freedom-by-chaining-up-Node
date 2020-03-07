let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    asset: {
        asset: {
            type: Schema.Types.ObjectId,
            ref: 'Asset'
        },
        amount: {
            type: Number
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);