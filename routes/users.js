const router = require("express").Router();
const { check } = require("express-validator");
const { getUsers, createUser } = require("../controllers/users");

router.get("/", getUsers);

router.post(
  "/",
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  check("email", "El correo es obligatorio").isEmail(),
  createUser
);

module.exports = router;
