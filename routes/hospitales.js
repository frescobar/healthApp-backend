const router = require("express").Router();
const { check } = require("express-validator");
const {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitales");
const { validateFields } = require("../middlewares/validar-campos");
const { validateToken } = require("../middlewares/validar-jwt");

//GET HOSPITALES
router.get("/", getHospitales);

//POST HOSPITALES
router.post(
  "/",
  validateToken,
  [
    check("nombre", "El nombre del hospital es requerido").not().isEmpty(),
    validateFields
  ],
  createHospital
);

//UPDATE HOSPITAL
router.put("/:id", updateHospital);

//DFELETE
router.delete("/:id", deleteHospital);

module.exports = router;
