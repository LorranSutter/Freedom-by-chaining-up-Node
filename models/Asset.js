let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AssetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
        },
    gameId: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    }
});

module.exports = mongoose.model('Asset', AssetSchema);