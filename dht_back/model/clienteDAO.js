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
  email VARCHAR(100) NOT NULL UNIQUE,\
  dataNascimento datetime NOT NULL, \
  senha VARCHAR(150) NOT NULL,\
  admin TINYINT,\
  CONSTRAINT cliente_pk PRIMARY KEY(cpf))",
  (err, result) => {
    if(err) console.log(err)
  }
)

module.exports = {
  
  checarCredenciais: async function(email, callback) {
    let SQL = "SELECT * FROM cliente WHERE email=?";
    database.query(SQL, [email], callback);
  },

  inserirCliente: async function(data, callback) {
    let SQL = "INSERT INTO cliente (nome, cpf, email, dataNascimento, senha, admin) VALUES (?, ?, ?, ?, ?, ?)"
    console.log(data)
    database.query(SQL, [data['name'], data['cpf'], data['email'], data['birthDate'], data['password'], data["admin"]], callback)
  },

  editarCliente: function(data, callback) {
    let SQL = "UPDATE cliente SET nome=?, email=?, dataNascimento=?, senha=? WHERE cpf=?"
    database.query(SQL, [data['name'], data['email'], data['birthDate'], data['password']], data['cpf'], callback)
  },

  listarClientes: function(callback) {
    let SQL = "SELECT * FROM cliente"
    database.query(SQL, callback)
  },

  deletarCliente: function(cpf, callback) {
    let SQL = "DELETE FROM cliente WHERE cpf=?"
    database.query(SQL, [cpf], callback)
  }
}
