const User = require("../models/Users");
const {validationResult} = require("express-validator");

//Obtener Usuarios
const getUsers = async (req, res) => {
  const users = await User.find({}, "nombre email google role");

  res.json({
    ok: true,
    users,
  });
};

// Crear usuario
const createUser = async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    const user = new User(req.body);
    await user.save();

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
};
