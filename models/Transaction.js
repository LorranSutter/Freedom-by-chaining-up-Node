let mongoose = require('mongoose');
let moment = require('moment');

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
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

TransactionSchema
.virtual('createdAt_formatted')
.get(function () {
    return this.createdAt ? moment(this.createdAt).format('YYYY-MM-DD HH:mm') : '';
});

module.exports = mongoose.model('Transaction', TransactionSchema);