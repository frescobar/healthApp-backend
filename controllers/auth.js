const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');
const login = async(req,res)=>{
    try {

        //Verificar Email
    const userDB = await User.findOne({email:req.body.email})
    if(!userDB){
        return res.status(404).json({
            ok:false,
            msg: "Correo o contraseña incorrecta"
        });
    };

        //Verificar contraseña
        const validatePassword = bcrypt.compareSync(req.body.password, userDB.password)

        if(!validatePassword){
            return res.status(400).json({
                ok: false,
                msg: "Correo o contraseña incorrexta"
            });

        };

        //generar token
        const token = await generateJWT(userDB.id);

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error inesperado"
        })
    }
}

module.exports = {
    login
}