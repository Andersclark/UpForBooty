const mongoose = require('mongoose');


const PersonSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  city: String,
  country: String,
  timezone: String,
});

module.exports = mongoose.model('Person', PersonSchema);

