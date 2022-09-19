const produtoDAO = require("../model/produtoDAO")

module.exports = {
  insert: (req, res) => {
    let data = req.body
    if (data) {
      produtoDAO.inserirProduto(data, (err, result) => {
        if (err) { 
          console.log(err)
          res.send(JSON.stringify({result: "FAILED"}))
        } else {
          res.send(JSON.stringify({result: "SUCCESS"}))
        }
      });
    }
  },

  edit: (req, res) => {
    let data = req.body
    produtoDAO.editarProduto(data, (err, result) => {
      if (err) { 
        console.log(err)
        res.send(JSON.stringify({result: "FAILED"}))
      } else {
        res.send(JSON.stringify({result: "SUCCESS"}))
      }
    })
  },

  get: (req, res) => {
    produtoDAO.listarProdutos((err, result) => {
      if (!err) { 
        res.send(result) 
      } else {
        res.send(JSON.stringify({result: "FAILED"}))
      }
    })
  },

  delete: (req, res) => {
    let productId = req.body['id']
    produtoDAO.deletarProduto(productId, (err, result) => {
      if (err) { 
        console.log(err)
        res.send(JSON.stringify({result: "FAILED"}))
      } else {
        res.send(JSON.stringify({result: "SUCCESS"}))
      }
    })
  },
 }