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

  const id = req.params.id;
  const hospitalDB = await Hospital.findById(id);

  if(!hospitalDB){
    return  res.status(404).json({
      ok:false,
      msg: "Hospital no encontrado por id",
    })
  }

  const updatedHospital = {
    ...req.body,
    usuario:id
  }

try {
  const newHospital = await Hospital.findByIdAndUpdate(id, updatedHospital, {new:true})

  res.json({
    ok:true,
hospital: newHospital
  })
} catch (error) {
  console.log(error)
  res.status(500).json({
    ok:false,
    msg:"Error inesperado"
  })
}
 
};


//DELETE HOSPITALS
const deleteHospital = async (req, res) => {

  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);
    if(!hospital){
      return res.status(404).json({
        ok:false,
        msg: "Hospital no encontradp"
      })
    }
    await Hospital.findByIdAndDelete(id)
    return res.json({
      ok: true,
      msg: "Hospital eliminado"
    })
  } catch (error) {
    
  }
  
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
