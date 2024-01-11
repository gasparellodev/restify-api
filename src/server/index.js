const restify = require('restify')
const routes = require('../http/routes')
const cors = require('../server/cors')
const server = restify.createServer()

server.use(restify.plugins.bodyParser())
routes(server)
server.pre(cors.preflight)
server.use(cors.actual)

module.exports = server
