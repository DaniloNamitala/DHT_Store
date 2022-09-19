const express = require("express")
const cors = require("cors")

const app = express();

const routerProduto = require("./router/routerProdutos")
const routerCliente = require("./router/routerCliente")
const routerCompras = require("./router/routerCompra")
// WSL iniciar mysql: sudo /etc/init.d/mysql start
// mysql -u root -p

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(routerProduto)
app.use(routerCliente)
app.use(routerCompras)


app.listen(3001, () => {
  console.log("Server Started");
});
