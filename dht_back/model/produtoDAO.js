
const mysql = require("mysql")

const database = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'dht_store'
})

database.query("CREATE TABLE IF NOT EXISTS produto(\
  id INT AUTO_INCREMENT NOT NULL,\
  nome VARCHAR(30) NOT NULL,\
  quantidade INT NOT NULL,\
  preco DOUBLE NOT NULL,\
  descricao TEXT,\
  CONSTRAINT produto_pk PRIMARY KEY(id))",
  (err, result) => {
    if(err) console.log(err)
  }
)

const inserirProduto = (data, callback) => {
  let SQL = "INSERT INTO produto (nome, quantidade, preco, descricao) VALUES (?, ?, ?, ?)"
  database.query(SQL, [data['title'], data['qty'], data['price'], data['description']], callback)
}

const editarProduto = (data, callback) => {
  let SQL = "UPDATE produto SET nome=?, quantidade=?, preco=?, descricao=? WHERE id=?"
  database.query(SQL, [data['title'], data['qty'], data['price'], data['description'], data["id"]], callback)
}

const buscarProduto = (id) => {
  let SQL = "SELECT * FROM produto WHERE id=?"
  return new Promise((resolve, reject) => {
    database.query(SQL, [id], (err, result) => {
      if (result)
        return resolve(result)
      else
        return reject(err)
    })
  })
}

const listarProdutos = (callback) => {
  let SQL = "SELECT * FROM produto"
  database.query(SQL, callback)
}

const decrementar = async (id, qtd, callback) => {
  let produto = await buscarProduto(id);
  if (produto.length > 0) {
    let SQL = "UPDATE produto set quantidade=? WHERE id=?"
    database.query(SQL, [produto[0].quantidade-qtd, id], callback)
  }
}

const deletarProduto = (id, callback) => {
  let SQL = "DELETE FROM produto WHERE id=?"
  database.query(SQL, [id], callback)
}

module.exports = {
  inserirProduto,
  editarProduto,
  listarProdutos,
  buscarProduto,
  deletarProduto,
  decrementar
}
