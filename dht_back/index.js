const express = require("express");
const mysql = require("mysql");
const cors = require("cors")

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'dht_store'
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

database.query("CREATE TABLE IF NOT EXISTS cliente(\
  id INT AUTO_INCREMENT NOT NULL,\
  nome VARCHAR(100) NOT NULL,\
  cpf VARCHAR(20) NOT NULL,\
  email VARCHAR(100) NOT NULL,\
  dataNascimento datetime NOT NULL, \
  senha VARCHAR(150) NOT NULL,\
  CONSTRAINT cliente_pk PRIMARY KEY(id))",
  (err, result) => {
    if(err) console.log(err);
  }
);

app.listen(3001, () => {
  console.log("Server Started");
  });
  
app.post("/insertProduct", (req, res) => {
  let data = req.body
  let SQL = "INSERT INTO produto (nome, quantidade, preco, descricao) VALUES (?, ?, ?, ?)"
  
  database.query(SQL, [data['title'], data['qty'], data['price'], data['description']], (err, result) => {
    if (err) { 
      console.log(err)
    } else {
      res.send(JSON.stringify({result: "SUCCESS"}))
    }
  });
});

app.post("/insertClient", (req, res) => {
  let data = req.body
  let SQL = "INSERT INTO cliente (nome, cpf, email, dataNascimento, senha) VALUES (?, ?, ?, ?, ?)"
  
  database.query(SQL, [data['name'], data['cpf'], data['email'], data['birthDate'], data['password']], (err, result) => {
    if (err) { 
      console.log(err)
    } else {
      res.send(JSON.stringify({result: "SUCCESS"}))
    }
  });

  
});

app.get("/getProductsList", (req, res) => {
  let SQL = "SELECT * FROM produto";

  database.query(SQL, (err, result) => {
    if (!err) res.send(result)
  })
})

app.get("/getClientList", (req, res) => {
  let SQL = "SELECT * FROM cliente";

  database.query(SQL, (err, result) => {
    if (!err) res.send(result)
  })
})
