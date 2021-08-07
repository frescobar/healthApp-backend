const Doctor = require("../models/Doctor");



//GET DOCTORES
const getDoctores = async (req, res) => {
  
  try {

    const doctores = await Doctor.find().populate("hospital", "nombre").populate("user", "nombre img");
    return res.json({
      ok:true,
      doctores
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: "Error inesperado"
    })
  }
};


//CREATE DOCTOR
const createDoctor =  async(req, res) => {

const id = req.id;
const doctor = new Doctor({
  user:id,...req.body
})
  try {
    const doctorDB = await doctor.save()
    res.status(201).json({
      ok:true,
      doctor:doctorDB
    })
  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: "error inesperado"
    })
  }
  

};

//UPDATE DOCTOR
const updateDoctor = async (req, res) => {
  const id = req.params.id;
  const doctorDB = await Doctor.findById(id);

  if(!doctorDB){
    return  res.status(404).json({
      ok:false,
      msg: "Doctor no encontrado por id",
    })
  }

  const updatedDoctor = {
    ...req.body,
    usuario:id
  }


 try {
   
  const newDoctor= await Doctor.findByIdAndUpdate(id, updatedDoctor, {new:true})

   return res.json({
     ok:true,
     doctor: newDoctor
   })
   
 } catch (error) {
return res.status(500).json({
  ok:false,
  msg:"Error inesperado"
})
 }
};


//DELETE DOCTOR 
const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  const doctorDB = await Doctor.findById(id);

  if(!doctorDB){
    return  res.status(404).json({
      ok:false,
      msg: "Doctor no encontrado por id",
    })
  }


 try {
   
 await Doctor.findByIdAndDelete(id)

   return res.json({
     ok:true,
     msg: "Doctor eliminado"
   })
   
 } catch (error) {
return res.status(500).json({
  ok:false,
  msg:"Error inesperado"
})
 }
};

module.exports = {
  getDoctores,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
