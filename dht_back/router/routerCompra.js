const express = require("express")
const router = express.Router();

const controller = require("../controller/controllerCompra")

router.get("/cadastrarCompra", controller.insert)
router.post("/editarCompra", controller.edit)
router.post("/listarCompra", controller.get)
router.post("/deletarCompra", controller.delete)

module.exports = router;