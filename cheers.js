const fetch = require('node-fetch')
const logger = require('./logger')
const cheerio = require('cheerio')
// const person = []
// require('./db/db')
const Prisoner = require('./models/prisoners')

const x = 0
async function getem () {
  const data = await fetch('https://www.clark.wa.gov/sheriff/jail-roster')
  const $ = cheerio.load(await data.text())

  const inmates = Array.from($('#jmsInfo > tbody > tr'))
  $(inmates).each((i, inmate) => {
    const a = Array.from($(inmate).children())
    const caseNum = $(a[0]).text()
    const name = $(a[1]).text()
    const bookDate = $(a[2]).text()
    const location = $(a[3]).text()
    const releaseDate = $(a[4]).text() || '0'
    const charge = $(a[5]).text()
    const lastSeen = new Date().toLocaleString()
    const mate = {
      caseNum,
      name,
      bookDate,
      location,
      releaseDate,
      charge,
      lastSeen,
      daysIn: Math.round((new Date(lastSeen).getTime() - new Date(bookDate).getTime()) / (1000 * 3600 * 24))

    }
    async function f () {
      const docs = await Prisoner.findOne({ name: mate.name })
      // logger.log(docs)
      if (!docs) {
        // logger.log('no docs')
        new Prisoner(mate).save()
        logger.log('saved')
      } else {
        // logger.log(docs)
        const now = new Date().toLocaleString()
        await Prisoner.findOneAndUpdate({ name: mate.name }, { lastSeen: now })
        logger.log(now, ' exists ')
      }
    }
    f()
    // logger.log(mate)
    // Prisoner.find()
    // if (!Prisoner.findOne({ name: mate.name })) {
    //   new Prisoner(mate).save()
    // } else {
    //   Prisoner.findOneAndUpdate({ name: mate.name }, { lastSeen: new Date().toLocaleDateString() })
    // }
    // logger.log(x)
    // person.push(mate)
    // x++
  })
  // logger.log(person.length)
  logger.log(inmates.length)
  // return person
}
module.exports = getem()
