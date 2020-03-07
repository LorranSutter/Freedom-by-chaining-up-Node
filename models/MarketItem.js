let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MarketItemSchema = new Schema({
    seller: {
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
            type: Number,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

MarketItemSchema
.virtual('createdAt_formatted')
.get(function () {
    return this.createdAt ? moment(this.createdAt).format('YYYY-MM-DD HH:mm') : '';
});

module.exports = mongoose.model('MarketItens', MarketItemSchema);