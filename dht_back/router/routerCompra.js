const express = require("express")
const router = express.Router();

const controller = require("../controller/controllerCompra")

router.get("/cadastrarCompra", controller.cadastrarCompra)
router.post("/editarCompra", controller.editarCompra)
router.post("/listarCompra", controller.listarCompras)
router.post("/deletarCompra", controller.deletarCompra)

module.exports = router;