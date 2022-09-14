const express = require("express")
const router = express.Router();

const controller = require("../controller/controllerCliente")

router.get("/getClientList", controller.get)
router.post("/login", controller.login)
router.post("/insertClient", controller.insert)

module.exports = router;