const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const MenuSchema = mongoose.Schema({
    title: String,
    path: String,
    Order: Number,
    active: boolean
});

module.exports = mongoose.model('Menu', MenuSchema);
