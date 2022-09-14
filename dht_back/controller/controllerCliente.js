const clienteDAO = require("../model/clienteDAO")
const bcrypt = require("bcryptjs")

module.exports = {
  insert: async (req, res) => {
    let data = req.body
    data["password"] = await bcrypt.hash(data["password"], 10)
    clienteDAO.inserirCliente(data, (err, result) => {
      if (err) { 
        console.log(err)
        res.send(JSON.stringify({result: "FAILED"}))
      } else {
        res.send(JSON.stringify({result: "SUCCESS"}))
      }
    })
  },

  get: (req, res) => {
    clienteDAO.listarClientes((err, result) => {
      if (!err) { 
        res.send(result) 
      } else {
        res.send(JSON.stringify({result: "FAILED"}))
      }
    })
  },

  login: async (req, res) => {
    let data = req.body;

    clienteDAO.checarCredenciais(data["email"], async (err, result) => {
      let encrypt_res = result.length > 0
      if (encrypt_res){
        encrypt_res = await bcrypt.compare(data["password"], result[0].senhacl)
      }
      
      if (encrypt_res) {
        res.send(JSON.stringify({ result: "SUCCESS" }))
      } else {
        res.send(JSON.stringify({ result: "FAILED" }))
      }
    })
  },
 }