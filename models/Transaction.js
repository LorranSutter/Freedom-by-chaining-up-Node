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
        }
    }    
});

module.exports = mongoose.model('Transaction', TransactionSchema);