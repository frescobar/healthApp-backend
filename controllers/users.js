const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const {generateJWT} = require("../helpers/jwt")
//GET USUARIO
const getUsers = async (req, res) => {
  const users = await User.find({}, "nombre email google role");

  res.json({
    ok: true,
    users,
  });
};

// POST USUARIO(crear)
const createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    //creacion usuario con la data que viene del request
    const user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);

     // guardar usuario
     await user.save();

    //Generar token
    const token = await generateJWT(user.id)

   

    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

//UPDATE USUARIO
const updateUser = async (req, res) => {
  //TODO: Validar token y comprobar si es el usuario correcto

  //Obtener el id del usuario por
  const id = req.params.id;

  try {
    //buscar usuario por id
    const dbUser = await User.findById(id);
    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id",
      });
    }

    //actualizar usuario

    const fields = req.body;

    //validar si el usuario actualiza el correo a uno ya existente
    if (dbUser.email === fields.email) {
      delete fields.email;
    } else {
      const emailExists = await User.findOne({ email: fields.email });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe usuario con ese correo",
        });
      }
    }

    //eliminar campos de la req que no voy a actualizar
    delete fields.password;
    delete fields.google;

    const updatedUser = await User.findByIdAndUpdate(id, fields, { new: true });

    res.status(200).json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

//DELETE USER
const deleteUser = async(req,res)=>{
  const id = req.params.id;

  try {

    const userDB = await User.findById(id);
    if(!userDB){
      return res.status(404).json({
        ok:false,
        msg: "No existe usuario con ese id"
      })
    }

    await User.findByIdAndDelete(id)
    res.json({
      ok: true,
      msg: "Usuario eliminado correctamente"
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg: "Error inesperado"
    })
  }
}


module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
