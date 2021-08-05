const router = require("express").Router();
const { fileUpload, getImg } = require('../controllers/uploads');
const {validateToken} = require("../middlewares/validar-jwt");
const expressFileUpload = require("express-fileupload");


//midleware subida archivos
router.use(expressFileUpload())
router.put("/:tipo/:id", validateToken,fileUpload)

router.get("/:tipo/:foto", validateToken,getImg)

module.exports = router;