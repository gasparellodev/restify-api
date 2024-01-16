const masterOrder = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM masterorders', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar Pedidos Mestre', reject)
            return false
          }
          resolve({ MasterOrder: results })
        })
      })
    },
    save: (masterOrder) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const { date, idOrders, idClients } = masterOrder
        connection.query('INSERT INTO masterorders (date, idOrders, idClients) VALUES (?, ?, ?)',
          [date, idOrders, idClients],
          (error, results) => {
            if (error) {
              errorHandler(error, 'Falha ao salvar pedido mestre', reject)
              return false
            }
            resolve({
              MasterOrder: {
                date,
                idClients,
                idMasterOrders: results.insertId
              }
            })
          }
        )
      })
    },
    update: ({ idMasterOrders, date, idOrders, idClients }) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query(
          'UPDATE masterorders SET date = ?, idOrders = ?, idClients = ? WHERE idMasterOrders = ?;',
          [date, idOrders, idClients, idMasterOrders],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao atualizar o Pedido Mestre ${idMasterOrders}`, reject)
              return false
            }
            resolve({
              Pedido_Mestre: { idMasterOrders, date, idOrders, idClients },
              affectedRows: results.affectedRows
            })
          }
        )
      })
    },
    del: (idMasterOrders) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM masterorders WHERE idMasterOrders = ?', [idMasterOrders], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a Pedido Mestre ${idMasterOrders}`, reject)
            return false
          }
          console.log('Delete results:', results)
          resolve({ message: 'Pedido Mestre removido com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = masterOrder
