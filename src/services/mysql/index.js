const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
})

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)
  rejectFunction({ error: msg })
}

const categoryModule = require('./categories.js')({ connection, errorHandler })
module.exports = {

  categories: () => categoryModule

}
