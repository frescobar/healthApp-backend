const router = require("express").Router();
const { check } = require('express-validator');
const {login, googleSignin} = require("../controllers/auth")
const {validateFields} = require("../middlewares/validar-campos")


router.post("/",
[
 check("email", "El email es obligatorio").isEmail(),
 check("password", "La contraseña es obligatoria").not().isEmpty(),
 validateFields,
]
,login)

router.post("/google",
[
 check("token", "El toke de google obligatorio").not().isEmpty(),
 validateFields,
]
,googleSignin)




module.exports = router;