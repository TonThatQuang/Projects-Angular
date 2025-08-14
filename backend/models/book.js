const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    image: String
});

module.exports = mongoose.model('Book', BookSchema);
