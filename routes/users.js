const router = require("express").Router();
const { check } = require("express-validator");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");
const { validateFields } = require("../middlewares/validar-campos");
const { validateToken } = require('../middlewares/validar-jwt');

//GET
router.get("/",validateToken, getUsers);

//POST
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validateFields,
  ],
  createUser
);

//PUT

router.put(
  "/:id",
  
  [
    validateToken,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("role", "el role es obligatoria").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete("/:id", validateToken,deleteUser)

module.exports = router;
