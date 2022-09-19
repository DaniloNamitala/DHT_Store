const compraDAO = require("../model/compraDAO");
const comprasDAO = require("../model/compraDAO");

module.exports = {
  insert: (req, res) => {
    let data = req.body;
    comprasDAO.inserirCompra(data, (err, result) => {
      if (!err) {
        res.send(JSON.stringify({ result: "SUCCESS" }));
      } else {
        res.send(JSON.stringify({ result: "FAILED" }));
      }
    });
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

