const express = require("express");
const mysql = require("mysql");

const app = express();

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dht_store"
});

database.query("CREATE TABLE IF NOT EXISTS produto(\
  id INT AUTO_INCREMENT NOT NULL,\
  nome VARCHAR(30) NOT NULL,\
  quantidade INT NOT NULL,\
  preco DOUBLE NOT NULL,\
  descricao TEXT,\
  CONSTRAINT produto_pk PRIMARY KEY(id))",
  (err, result) => {
    if(err) console.log(err);
  }
);

app.listen(3001, () => {
  console.log("Server Started");
});

app.get("/insertProduct", (req, res) => {
  console.log("insert called");
  let name = req.body
  let description = req.body
  let quantity = req.body
  let price = req.body

  let SQL = "INSERT INTO produto (nom, quantidade, preco, descricao) VALUES (?, ?, ?, ?)"
  database.query(SQL, [name, description, quantity, price], (err, result) => {
    if (err) console.log(err)
  });
});