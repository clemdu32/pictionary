const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    start: Date,
    numberOfTurn: Number,
    status : String,
    creator: String,
    players: [String]
});



const Party = mongoose.model('party', PartySchema);

module.exports = Party;
