const mongoose = require('../index');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  gender: String,
  region: String
});

module.exports = mongoose.model('User', userSchema);
