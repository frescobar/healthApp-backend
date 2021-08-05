const jwt = require("jsonwebtoken");

const validateToken = (req,res,next)=>{

    const token = req.header("x-token")
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: "No hay token en la peticion"
        })
    }
    try {
        const {id} = jwt.verify(token,process.env.JWT_SECRET_KEY);

        //Se le asigna a la req.id el id del usuario de su token
        req.id = id
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: "Token incorrecto"
        })
    }
 

    next();
}


module.exports = {
    validateToken
}