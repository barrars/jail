const prisoners = require('./models/prisoners')
const logger = require('./logger')
require('./db/db')

async function f () {
  const docs = await prisoners.findOne({ name: 'David' })
  logger.log(docs)
  if (!docs) {
    logger.log('no docs')
    new prisoners({ name: 'David' }).save()
  } else {
    logger.log(docs)
  }
}
logger.log('running')
f()
// logger.log(f())
// prisoners.find()

logger.log('running ')
