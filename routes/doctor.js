const router = require("express").Router();
const { check } = require("express-validator");
const {getDoctores,createDoctor, updateDoctor,deleteDoctor} = require("../controllers/doctor")
const { validateFields } = require("../middlewares/validar-campos");
const { validateToken } = require('../middlewares/validar-jwt');


//GET DOCTORES
router.get("/",validateToken, getDoctores)

//POST DOCTORES
 router.post("/",
 validateToken,
  [
    check("nombre", "El nombre del doctor es requerido").not().isEmpty(),
    check("hospital", "El id del hospital no es válido").isMongoId(),
    validateFields
  ],
  createDoctor
  )

 //UPDATE DOCTORES
 router.put("/:id", updateDoctor)

 //DFELETE DOCTORES
 router.delete("/:id", deleteDoctor)


module.exports = router;