const {Router} = require("express");
const GestorUsuarios = require("../controllers/login.controller");
const router = Router();

let controller = new GestorUsuarios();

router.get("/", controller.getUsuarios);
router.get("/registrar", controller.registrarUsuario);

module.exports = router;