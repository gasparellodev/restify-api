const db = require('../services/mysql')

const routes = (server) => {
  server.get('/categoria', async (req, res) => {
    try {
      res.send(await db.categories().all())
    } catch (error) {
      res.send(error)
    }
  })
  server.post('/categoria', async (req, res) => {
    const { nameCategory } = req.body
    try {
      res.send(await db.categories().save(nameCategory))
    } catch (error) {
      res.send(error)
    }
  })
  server.put('/categoria', async (req, res) => {
    const { idProductsCategories, nameCategory } = req.body
    try {
      res.send(await db.categories().update(idProductsCategories, nameCategory))
    } catch (error) {
      res.send(error)
    }
  })
  server.del('/categoria', async (req, res) => {
    const { idProductsaCategories } = req.body
    try {
      res.send(await db.categories().del(idProductsaCategories))
    } catch (error) {
      res.send(error)
    }
  })
}

module.exports = routes
