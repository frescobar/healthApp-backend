const User = require('../models/Users')
const Hospital = require("../models/Hospital")
const Doctor = require("../models/Doctor")
const Users = require('../models/Users')

const getBusqueda = async (req,res)=>{
    const busqueda = req.params.busqueda

    //Busqueda termino que incluya la palabra de busqueda
    const regexp = new RegExp(busqueda, "i")

    //Promesa simultanea
   const [users, hospitals,doctors] = await Promise.all([
     User.find({nombre:regexp}),
     Hospital.find({nombre:regexp}),
     Doctor.find({nombre:regexp})
     
   ])

    res.json({
        ok:true,
        users,
        hospitals,
        doctors
    })
}

const getCollectionDocuments= async (req,res)=>{
    const busqueda = req.params.busqueda
    const coleccion = req.params.coleccion

    //Busqueda termino que incluya la palabra de busqueda
    const regexp = new RegExp(busqueda, "i")

 let data = [];
    switch (coleccion) {
        case 'doctores':
        data = await Doctor.find({nombre:regexp}).populate("user", "nombre, img").populate("hospital", "nombre img");   
        break;

        case "users":
        data = await Users.find({nombre:regexp}).populate("user", "nombre, img"); 
        break;

        case "hospitales":
        data = await Hospital.find({nombre:regexp});
            
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg: "La tabla no existe"
            })

    }

     res.json({
        ok:true,
        resultado:data
    })
    
  
}

module.exports = {
    getBusqueda,
    getCollectionDocuments
}