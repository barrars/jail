const mongoose = require('mongoose')

mongoose.connect('mongodb://user:blurr123@ds127300.mlab.com:27300/jail', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// db.on('error', console.error('conection error'))
db.once('open', function () {
  console.log('connected to mongo')
  // server.listen(port)
  // server.on('error', onError)
  // server.on('listening', onListening)
})
