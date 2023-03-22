const {Router} = require("express");
const GestorUsuarios = require("../controllers/login.controller");
const router = Router();
const auth = require("../middleware/auth");

let controller = new GestorUsuarios();

router.get("/", controller.getUsuarios);
router.post("/registrar", controller.registrarUsuario);
router.post("/login",controller.login);
router.post("/auth", auth,(req,res)=>{
    res.status(200).send({status:'ok', mensaje:'token correcto'});
});
router.post("/authToken", controller.comprobarToken);

module.exports = router;