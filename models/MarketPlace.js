let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MarketPlaceSchema = new Schema({
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

module.exports = mongoose.model('MarketPlace', MarketPlaceSchema);