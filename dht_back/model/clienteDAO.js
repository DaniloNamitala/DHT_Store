const mysql = require("mysql")

const database = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'dht_store'
})

database.query("CREATE TABLE IF NOT EXISTS cliente(\
  nome VARCHAR(100) NOT NULL,\
  cpf CHAR(14) NOT NULL,\
  email VARCHAR(100) NOT NULL,\
  dataNascimento datetime NOT NULL, \
  senha VARCHAR(150) NOT NULL,\
  CONSTRAINT cliente_pk PRIMARY KEY(cpf))",
  (err, result) => {
    if(err) console.log(err)
  }
)

module.exports = {
  
  checarCredenciais: function(email, callback) {
    let SQL = "SELECT senha FROM cliente WHERE email=?";
    database.query(SQL, [email], callback);
  },

  inserirCliente: async function(data, callback) {
    let SQL = "INSERT INTO cliente (nome, cpf, email, dataNascimento, senha) VALUES (?, ?, ?, ?, ?)"
    database.query(SQL, [data['name'], data['cpf'], data['email'], data['birthDate'], data['password']], callback)
  },

  editarCliente: function(data, callback) {
    let SQL = "UPDATE cliente SET nome=?, email=?, dataNascimento=?, senha=? WHERE cpf=?"
    database.query(SQL, [data['name'], data['email'], data['birthDate'], data['password']], data['cpf'], callback)
  },

  listarClientes: function(callback) {
    let SQL = "SELECT * FROM cliente"
    database.query(SQL, callback)
  },

  deletarCliente: function(id, callback) {
    let SQL = "DELETE FROM cliente WHERE id=?"
    database.query(SQL, [id], callback)
  }
}
