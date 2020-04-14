const mongoose = require('mongoose')

const Inmates = new mongoose.Schema({
  caseNum: String,
  name: String,
  bookDate: String,
  location: String,
  releaseDate: String,
  charge: String,
  lastSeen: Date,
  daysIn: Number

})
Inmates.index({ name: 1 })

module.exports = mongoose.model('Inmates', Inmates)
