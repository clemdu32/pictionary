const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    word: String
});



const Word = mongoose.model('word', WordSchema);

module.exports = Word;
