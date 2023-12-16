const fs = require('fs')
const stable = require('json-stable-stringify')

module.exports = class LocalDB {
   constructor(db) {
      this.file = db || 'database'
   }

   fetch = async () => {
      if (!fs.existsSync(`./storage/${this.file}.json`)) return ({})
      const json = JSON.parse(fs.readFileSync(`./storage/${this.file}.json`, 'utf-8'))
      return json
   }

   save = async data => {
      const database = data ? data : global.db
      fs.writeFileSync(`./storage/${this.file}.json`, stable(database))
      fs.writeFileSync(`./storage/${this.file}.bak`, stable(database))
   }
}