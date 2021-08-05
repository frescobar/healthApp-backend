const User = require("../models/Users");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const fs = require("fs");


const deleteImgFromDir = (oldpath)=>{
    if ( fs.existsSync(oldPath) ) {
        fs.unlink( oldPath, (err) => {
           if (err) {
            return res.status(400).json({
             ok: false,
             mensaje: 'No se pudo reemplazar la imagen!',
              errors: err
             });
            }
          });
         }
}

let oldPath = "";


const updateImg  = async(tipo,id,fileName)=>{

 switch (tipo) {
     case "users":
        const users = await User.findById(id);
        if(!users){
            res.status(400).json({
                ok:false,
                msg: "No se encontró usuario por id"
            })
            return false
        }
        oldPath = `./uploads/users/${users.img}`;
        deleteImgFromDir(oldPath)

        users.img = fileName;
             await users.save();
         break;

     case "hospitals":
        const hospital = await Hospital.findById(id);
        if(!hospital){
            res.status(400).json({
                ok:false,
                msg: "No se encontró hospital por id"
            })

            return false;
        }
        oldPath = `./uploads/hospitals/${hospital.img}`;
        deleteImgFromDir(oldPath)

        hospital.img = fileName;
             await hospital.save();
         
         break;


     case "doctors":
         const doctor = await Doctor.findById(id);
         if(!doctor){
             res.status(400).json({
                 ok:false,
                 msg: "No se encontró doctor por id"
             })
             return false;
         }

          oldPath = `./uploads/doctors/${doctor.img}`;

         deleteImgFromDir(oldPath);

             doctor.img = fileName;
             await doctor.save();
         break;
         
     default:
         res.status(500).json({
             ok:false,
             msg: "Error inesperado"
         })
         break;
 }
}

module.exports = {
    updateImg
}