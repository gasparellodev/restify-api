const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)
  rejectFunction({ error: msg })
}

const categoryModule = require('./categories.js')({ connection, errorHandler })
const productModule = require('./products.js')({ connection, errorHandler })
const clientModule = require('./clients.js')({ connection, errorHandler })

module.exports = {

  categories: () => categoryModule,
  products: () => productModule,
  clients: () => clientModule

}
