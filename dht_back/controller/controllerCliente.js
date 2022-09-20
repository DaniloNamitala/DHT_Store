const clienteDAO = require("../model/clienteDAO");
const bcrypt = require("bcryptjs");

const validarCPF = (cpf) => {
  var soma;
  var resto;
  let strCPF = cpf.replaceAll(".","").replace("-","")
  soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11))  resto = 0;
  if (resto != parseInt(strCPF.substring(9, 10)) ) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11))  resto = 0;
  if (resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}

const insert = async (req, res) => {
  let data = req.body;
  data["password"] = await bcrypt.hash(data["password"], 10);
  clienteDAO.inserirCliente(data, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ result: "FAILED" }));
    } else {
      res.send(JSON.stringify({ result: "SUCCESS" }));
    }
  });
}

const get = (req, res) => {
  clienteDAO.listarClientes((err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.send(JSON.stringify({ result: "FAILED" }));
    }
  });
}

const login = async (req, res) => {
  let data = req.body;

  clienteDAO.checarCredenciais(data["email"], async (err, result) => {
    let encrypt_res = result.length > 0;
    if (encrypt_res)
      encrypt_res = await bcrypt.compare(data["password"], result[0].senha);

    if (encrypt_res) {
      res.send(JSON.stringify({ result: "SUCCESS", user: result[0] }));
    } else {
      res.send(JSON.stringify({ result: "FAILED" }));
    }
  });
}

module.exports = {
  insert,
  get,
  login,
  validarCPF
};

