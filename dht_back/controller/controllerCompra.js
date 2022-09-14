const compraDAO = require("../model/compraDAO")
const comprasDAO = require("../model/compraDAO")

module.exports = {
  cadastrarCompra: (req, res) => {
    let data = req.body
    comprasDAO.inserirCompra(data, (err, result)=> {
      if (!err) {
        res.send(JSON.stringify({result: "SUCCESS"}))
      } else {
        res.send(JSON.stringify({result: "FAILED"}))
      }
    })
  },

  listarCompras: (req, res) => {

  },

  editarCompra: (req, res) => {

  },

  deletarComra: (req, res) => {

  }
}