const db = require('../services/mysql')

const routes = (server) => {
  // Categorias
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
    const { idProductsCategories } = req.params
    try {
      res.send(await db.categories().del(idProductsCategories))
    } catch (error) {
      res.send(error)
    }
  })

  // Produtos
  server.get('/produtos', async (req, res) => {
    try {
      res.send(await db.products().all())
    } catch (error) {
      res.send(error)
    }
  })
  server.post('/produtos', async (req, res) => {
    const { name, price, idProductsCategories } = req.body
    const product = { name, price, idProductsCategories }
    try {
      const result = await db.products().save(product)
      res.send(201, result)
    } catch (error) {
      res.send(500, error)
    }
  })
  server.put('/produtos', async (req, res) => {
    const { idProducts, name, price, idProductsCategories } = req.body
    try {
      res.send(await db.products().update({ idProducts, name, price, idProductsCategories }))
    } catch (error) {
      res.send(error)
    }
  })
  server.del('/produtos/:idProducts', async (req, res) => {
    const { idProducts } = req.params
    try {
      res.send(await db.products().del(idProducts))
    } catch (error) {
      res.send(error)
    }
  })
}

module.exports = routes
