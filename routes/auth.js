const router = require("express").Router();
const { check } = require('express-validator');
const {login, googleSignin, renewToken} = require("../controllers/auth")
const {validateFields} = require("../middlewares/validar-campos")
const {validateToken} = require("../middlewares/validar-jwt")


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

router.get("/renew",
validateToken
,renewToken)




module.exports = router;