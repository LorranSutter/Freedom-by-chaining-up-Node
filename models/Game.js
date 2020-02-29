let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GameSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Game', GameSchema);