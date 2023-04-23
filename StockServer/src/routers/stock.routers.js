const { Router } = require("express");
const GestorStock = require("../controllers/stock.controller");
const router = Router();

let controller = new GestorStock();

router.get("/", controller.getPedidos);


module.exports = router;