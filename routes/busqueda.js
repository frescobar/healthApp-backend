const router = require("express").Router();
const {validateToken} = require("../middlewares/validar-jwt")

const {getBusqueda,
    getCollectionDocuments} = require("../controllers/busqueda")

router.get("/:busqueda", validateToken,getBusqueda)

router.get("/coleccion/:coleccion/:busqueda",validateToken,getCollectionDocuments)

module.exports = router;