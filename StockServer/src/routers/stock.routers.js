const { Router } = require("express");
const GestorStock = require("../controllers/stock.controller");
const router = Router();

let controller = new GestorStock();

router.get("/pedidos", controller.getPedidos);
router.get("/productos", controller.getProductos);
router.get("/precio", controller.getPrecio);


module.exports = router;