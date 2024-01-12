const products = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, erroHandler } = deps
        connection.query('SELECT * FROM products', (error, results) => {
          if (error) {
            erroHandler(error, 'Falha ao listar produtos', reject)
            return false
          }
          resolve({ Produtos: results })
        })
      })
    },
    save: (product) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const { name, price, idProductsCategories } = product

        connection.query(
          'INSERT INTO products (name, price, idProductsCategories) VALUES (?, ?, ?);',
          [name, price, idProductsCategories],
          (error, results) => {
            if (error) {
              errorHandler(error, `Falha ao salvar produto ${name}, ${price}, ${idProductsCategories}`, reject)
              return false
            }
            resolve({
              Produto: {
                name,
                price,
                idProductsCategories,
                idProducts: results.insertId
              }
            })
          }
        )
      })
    },
    update: ({ idProducts, name, price, idProductsCategories }) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query(
          'UPDATE products SET name = ?, price = ?, idProductsCategories = ? WHERE idProducts = ?;',
          [name, price, idProductsCategories, idProducts],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao atualizar o produto ${idProducts}`, reject)
              return false
            }
            resolve({
              Produto: { idProducts, name, price, idProductsCategories },
              affectedRows: results.affectedRows
            })
          }
        )
      })
    },
    del: (idProducts) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM products WHERE idProducts = ?', [idProducts], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a produto ${idProducts}`, reject)
            return false
          }
          console.log('Delete results:', results)
          resolve({ message: 'Produto removido com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = products
