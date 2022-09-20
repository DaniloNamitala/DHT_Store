const comprasDAO = require("../model/compraDAO");
const produtoDAO = require("../model/produtoDAO")
module.exports = {
  insert: async (req, res) => {
    let data = req.body;
    let produto = await produtoDAO.buscarProduto(data["idProduto"]);

    if (produto.length > 0 || produto[0].quantidade < 1) {
      data["preco"] = produto[0].preco
      comprasDAO.inserirCompra(data, (err, result) => {
        if (!err) {
          produtoDAO.decrementar(produto[0].id, 1, (errr, result)=>{console.log(errr)})
          res.send(JSON.stringify({ result: "SUCCESS" }));
        } else {
          console.log(err)
          res.send(JSON.stringify({ result: "FAILED", reason: err }));
        }
      });
    } else {
      res.send(JSON.stringify({ result: "FAILED", reason: "PRODUTO OU QUANTIDADE INVALIDA" }));
    }
  },

  get: (req, res) => {
    comprasDAO.listarCompras((err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(JSON.stringify({ result: "FAILED" }));
      }
    });
  },

  edit: (req, res) => {
    let data = req.body;
    comprasDAO.editarCompra(data, (err, result) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify({ result: "FAILED" }));
      } else {
        res.send(JSON.stringify({ result: "SUCCESS" }));
      }
    });
  },

  delete: (req, res) => {
    let data = req.body;
    comprasDAO.deletarCompra(data, (err, result) => {
      if (!err) {
        res.send(JSON.stringify({ result: "SUCCESS" }));
      } else {
        res.send(JSON.stringify({ result: "FAILED" }));
      }
    });
  },
};

