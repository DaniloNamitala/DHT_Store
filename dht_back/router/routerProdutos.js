const express = require("express")
const router = express.Router();

const controller = require("../controller/controllerProdutos")

router.get("/getProductsList", controller.get)
router.post("/deleteProduct", controller.delete)
router.post("/editProduct", controller.edit)
router.post("/insertProduct", controller.insert)

module.exports = router;