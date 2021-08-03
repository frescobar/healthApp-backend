const router = require("express").Router();
const { check } = require('express-validator');
const {login} = require("../controllers/auth")
const {validateFields} = require("../middlewares/validar-campos")


router.post("/",
[
 check("email", "El email es obligatorio").isEmail(),
 check("password", "La contraseña es obligatoria").not().isEmpty(),
 validateFields,
]
,login)




module.exports = router;