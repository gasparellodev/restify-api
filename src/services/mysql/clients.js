const clients = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM clients', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar clientes', reject)
            return false
          }
          resolve({ Produtos: results })
        })
      })
    },
    save: (client) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const { name, email } = client
        connection.query('INSERT INTO clients (name, email) VALUES (?, ?)',
          [name, email],
          (error, results) => {
            if (error) {
              errorHandler(error, `Falha ao salvar cliente ${name}, ${email}`, reject)
              return false
            }
            resolve({
              Client: {
                name,
                email,
                idClients: results.insertId
              }
            })
          }
        )
      })
    },
    update: ({ idClients, name, email }) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query(
          'UPDATE clients SET name = ?, email = ? WHERE idClients = ?;',
          [name, email, idClients],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao atualizar o cliente ${idClients}`, reject)
              return false
            }
            resolve({
              Cliente: { idClients, name, email },
              affectedRows: results.affectedRows
            })
          }
        )
      })
    },
    del: (idClients) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM clients WHERE idClients = ?', [idClients], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a cliente ${idClients}`, reject)
            return false
          }
          console.log('Delete results:', results)
          resolve({ message: 'Cliente removido com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = clients
