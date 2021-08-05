const path = require("path")
const fs = require("fs")
const  {v4: uuidv4} = require("uuid");
const { updateImg } = require('../helpers/update-img');
const fileUpload = (req,res)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ["users","doctors","hospitals"];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: "No es un tipo válido (users,hospitals,doctors)"
        })
    };
        //Validar que existe un archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
            msg: "No hay ningún archivo"
        })   
     }

     //Procesar imagen
     const file = req.files.file;
     const formattedName = file.name.split(".");
     const extension = formattedName[formattedName.length - 1];

     const validFormats = ["jpeg","png", "gif", "jpg"];
     if(!validFormats.includes(extension)){
          res.status(400).json({
             ok:false,
             msg:"No es una extensión válida"
         })
     }
     //generar nombre de archivo
     const fileName = `${uuidv4()}.${extension}`;

     //path guardar imagen
     const path = `./uploads/${tipo}/${fileName}`;

     //Mover la imagen
     file.mv(path, function(err){
         if(err){
             console.log(err)
             return res.status(500).json({
                 ok:false,
                 msg: "Error al guardar la imagen"
             })
         }

         //Actualizar la imagen en la bd

         updateImg(tipo,id,fileName);

         res.json({
             ok:true,
             msg: "Imagen cargada",
             fileName
         })
     })
 

}

const getImg =  (req,res)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto

    const pathimg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    if(fs.existsSync()){
        res.sendFile(pathimg);
    }
    else{
        const pathimg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathimg);
    }

    
   


}

module.exports = {
    fileUpload,
    getImg
}