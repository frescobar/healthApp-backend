const Hospital = require("../models/Hospital");



//GET HOSPITALS
const getHospitales = async (req, res) => {


  try {                                     // populate muestra el usuario que creó el registro del hospital
    const hospitals = await Hospital.find().populate("user", "nombre img") 
    return res.json({
      ok:true,
      hospitals
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: "Error inesperado"
    })
    
  }
  
  
};


//CREATE HOSPITALS
const createHospital = async (req, res) => {
    // obtener el id del usuario que hizo la peticion a traves del token
    const id = req.id;
      const hospital = new Hospital({
        user: id,...req.body
    });

    
  
   try {
  
    const hospitalDB = await hospital.save();
     return res.json({
      ok: true,
      hospital:hospitalDB,
    });

     
   } catch (error) {
    console.log(error)
     res.status(500).json({ 
       ok:false,
       msg: "Error inesperado"
     })
   }
};

//UPDATE HOSPITALS
const updateHospital = async (req, res) => {


 
};


//DELETE HOSPITALS
const deleteHospital = async (req, res) => {
  res.json({
    ok: true,
    msg: "Hospital eliminado",
  });
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
