const mysql = require("mysql")
const produtoDAO = require("./produtoDAO")

const database = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'dht_store'
})

database.query("CREATE TABLE IF NOT EXISTS compra(\
  id INT AUTO_INCREMENT NOT NULL,\
  idProduto int NOT NULL,\
  cpfCliente CHAR(14) NOT NULL,\
  precoProduto DOUBLE NOT NULL,\
  quantidadeProduto INTEGER NOT NULL,\
  CONSTRAINT fk_cpf FOREIGN KEY (cpfCliente) REFERENCES cliente(cpf),\
  CONSTRAINT fk_produto FOREIGN KEY (idProduto) REFERENCES produto(id),\
  CONSTRAINT produto_pk PRIMARY KEY(id))",
  (err, result) => {
    if(err) console.log(err)
  }
)

module.exports = {
  inserirCompra: function(data, callback) {
    let produto = await produtoDAO.buscarProduto(data["id"])
    if (produto.length > 0) {
      let SQL = "INSERT INTO compra (idProduto, cpfCliente, quantidadeProduto, precoProduto) VALUES (?, ?, ?, ?)"
      database.query(SQL, [data["idProduto"], data["cpfCliente"], data["quantidade"], produto[0].preco])
    } else {
      callback("ERRO", null)
    }
  },

  listarCompras: function(callback) {
    let SQL = "SELECT * FROM compra"
    database.query(SQL, callback)
  },

  editarCompra: function(data, callback) {
    let SQL = "UPDATE produto SET idProduto=?, cpfCliente=?, quantidadeProduto=?, precoProduto=? WHERE id=?"
    database.query(SQL, [data["idProduto"], data["cpfCliente"], data["quantidade"], data["preco"], data["id"]], callback)
  },

  deletarCompra: function(id, callback) {
    let SQL = "DELETE FROM compra WHERE id=?"
    database.query(SQL, [id], callback)
  }
}