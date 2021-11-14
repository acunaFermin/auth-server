const { response } = require("express");
const jwt = require('jsonwebtoken');



const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        });
    }

    try {

        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        
        //le mando al controlador el uid y el name validado
        //a traves de la request, recordar que primero pasa por aca
        //y despues va al controlador
        req.uid = uid;
        req.name = name;


    } catch (error) {
        return res.status(401).json({
            ok:false, 
            msg: 'token no valido'
        });
    }


    next();
}




module.exports = { validarJWT };