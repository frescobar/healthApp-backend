const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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
                msg: "Correo o contraseña incorrecta"
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

const googleSignin =  async(req,res)=>{

    const googleToken = req.body.token;
    

    try {
       const {name,email,picture} = await googleVerify(googleToken);
       const userDB = await User.findOne({email});
 let user;
       //Si no existre el usuario creamos un usuario con los datos de google
       if(!userDB){
           user = new User({
               nombre:name,
               email,
               password: "@@@@",
               img:picture,
               google:true
           })

       }
       else{
           user =  userDB,
           user.google = true
       }

       await user.save()

       //generar token
       const token = await generateJWT(userDB.id);


        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:"Toke no es válido"
        })
        
    }

  
  
}

const renewToken = async(req,res)=>{
    const id = req.id;

    const token = await generateJWT(id);

    res.json({
        ok:true,
        token
    })
}


module.exports = {
    login,
    googleSignin,
    renewToken
}