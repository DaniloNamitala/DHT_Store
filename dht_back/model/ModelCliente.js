
module.exports = {
  
  create: function(database) {
    database.query("CREATE TABLE IF NOT EXISTS cliente(\
      nome VARCHAR(100) NOT NULL,\
      cpf VARCHAR(20) NOT NULL,\
      email VARCHAR(100) NOT NULL,\
      dataNascimento datetime NOT NULL, \
      senha VARCHAR(150) NOT NULL,\
      CONSTRAINT cliente_pk PRIMARY KEY(cpf))",
      (err, result) => {
        if(err) console.log(err)
      }
    )
  },

  inserirCliente: function(database, data, callback) {
    let SQL = "INSERT INTO cliente (nome, cpf, email, dataNascimento, senha) VALUES (?, ?, ?, ?, ?)"
    database.query(SQL, [data['name'], data['cpf'], data['email'], data['birthDate'], data['password']], callback)
  },

  editarCliente: function(database, data, callback) {
    let SQL = "UPDATE cliente SET nome=?, email=?, dataNascimento=?, senha=? WHERE cpf=?"
    database.query(SQL, [data['name'], data['email'], data['birthDate'], data['password']], data['cpf'], callback)
  },

  listarClientes: function(database, callback) {
    let SQL = "SELECT * FROM cliente"
    database.query(SQL, callback)
  },

  deletarCliente: function(database, id, callback) {
    let SQL = "DELETE FROM cliente WHERE id=?"
    database.query(SQL, [id], callback)
  }
}
