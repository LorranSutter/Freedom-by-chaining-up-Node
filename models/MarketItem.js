let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MarketItemSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    asset: {
        type: Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    }
});

module.exports = mongoose.model('MarketPlace', MarketItemSchema);