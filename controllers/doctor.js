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
  res.json({
    ok: true,
    msg: "doctor actualizado",
  });
};


//DELETE DOCTOR 
const deleteDoctor = async (req, res) => {
  res.json({
    ok: true,
    msg: "doctor eliminado",
  });
};

module.exports = {
  getDoctores,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
