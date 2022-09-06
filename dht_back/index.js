const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const ModelProduto = require("./model/ModelProduto")
const ModelCliente = require("./model/ModelCliente")

const app = express()

// WSL iniciar mysql: sudo /etc/init.d/mysql start
// mysql -u root -p

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'dht_store'
})

ModelProduto.create(database)
ModelCliente.create(database)

app.listen(3001, () => {
  console.log("Server Started")
})

app.get("/getProductsList", (req, res) => {
  ModelProduto.listarProdutos(database, (err, result) => {
    if (!err) { 
      res.send(result) 
    } else {
      res.send(JSON.stringify({result: "FAILED"}))
    }
  })
})

app.post("/deleteProduct", (req, res) => {
  let productId = req.body['id']
  ModelProduto.deletarProduto(database, productId, (err, result) => {
    if (err) { 
      console.log(err)
      res.send(JSON.stringify({result: "FAILED"}))
    } else {
      res.send(JSON.stringify({result: "SUCCESS"}))
    }
  })
})

app.post("/editProduct", (req, res) => {
  let data = req.body
  ModelProduto.editarProduto(database, data, (err, result) => {
    if (err) { 
      console.log(err)
      res.send(JSON.stringify({result: "FAILED"}))
    } else {
      res.send(JSON.stringify({result: "SUCCESS"}))
    }
  })
})

app.post("/insertProduct", (req, res) => {
  let data = req.body
  if (data) {
    ModelProduto.inserirProduto(database, data, (err, result) => {
      if (err) { 
        console.log(err)
        res.send(JSON.stringify({result: "FAILED"}))
      } else {
        res.send(JSON.stringify({result: "SUCCESS"}))
      }
    });
  }
})

app.post("/insertClient", (req, res) => {
  let data = req.body
  ModelCliente.inserirCliente(database, data, (err, result) => {
    if (err) { 
      console.log(err)
      res.send(JSON.stringify({result: "FAILED"}))
    } else {
      res.send(JSON.stringify({result: "SUCCESS"}))
    }
  })
})

app.post("/login", (req, res) => {
  let data = req.body;
  let email = data["email"]
  let senha = data["password"]
  ModelCliente.checarCredenciais(database, email, senha, (err, result) => {
    if (!err) {
      res.send(JSON.stringify({ result: "SUCCESS" }));
    } else {
      res.send(JSON.stringify({ result: "FAILED" }));
    }
  });
});

app.get("/getClientList", (req, res) => {
  ModelCliente.listarClientes(database, (err, result) => {
    if (!err) { 
      res.send(result) 
    } else {
      res.send(JSON.stringify({result: "FAILED"}))
    }
  })
})
