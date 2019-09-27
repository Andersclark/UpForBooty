const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let bootySchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNo: String,
    skypeHandle: String,
    email: String,
    city: String,
    country: String,
    timezone: String,
    picture: String
});

const Booty = mongoose.model('Booty', bootySchema);

module.exports = Booty;