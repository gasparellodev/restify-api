const categories = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM productscategories', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar categorias', reject)
            return false
          }
          resolve({ Categorias: results })
        })
      })
    },
    save: (nameCategory) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('INSERT INTO productscategories (nameCategory) VALUES (?)', [nameCategory], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar categoria ${nameCategory}`, reject)
            return false
          }
          console.log('Insert results:', results)
          resolve({ Categoria: { nameCategory, idProductsCategories: results.insertId } })
        })
      })
    },
    update: (idProductsCategories, nameCategory) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('UPDATE productscategories SET nameCategory = ? WHERE idProductsCategories = ?', [nameCategory, idProductsCategories], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar categoria ${nameCategory}`, reject)
            return false
          }
          resolve({ Categoria: { nameCategory, idProductsCategories }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (idProductsCategories) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM productscategories WHERE idProductsCategories = ?', [idProductsCategories], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a categoria ${idProductsCategories}`, reject)
            return false
          }
          console.log('Insert results:', results)
          resolve({ message: 'Categoria removida com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = categories
