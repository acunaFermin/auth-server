const { response } = require('express'); //para obtener el tipado del res
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');
const { db } = require('../models/Usuario');
// const { validationResult } = require('express-validator');


const crearUsuario = async ( req, res) => {

    const { name, email, password } = req.body;


    try{
        // verificar email
        let usuario =  await Usuario.findOne({ email });
        console.log(usuario)
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'el email ya existe'
            });
        }

        //crear usuario con el modelo
        const dbUser = new Usuario ( req.body );

        //hashear constraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        console.log(dbUser)



        //generar JWT

        const token = await generarJWT(dbUser.id, name);

        //generar usuario debase de datos
        await dbUser.save();


        //GENERAR RESPUESTA EXITOSA
        return res.status(201).json({
            ok:true,
            uid: dbUser.id,
            name,
            email,
            token,
            msg:'nuevo usuario generado'
        })
    }


    catch(error){
        console.log(error)
        throw new Error ('no se pudo crear nuevo usuario')
    }
}


const loginUsuario = async ( req, res = response) => {

    

    const { email, password } = req.body;

    try{

        const dbUser = await Usuario.findOne({ email })

        // verificar si existe el email
        if( !dbUser ){
            return res.status(400).json({
                ok: false,
                msg: 'el correo no existe'
            })
        }


        // confirmar si el password hace match
        // comparo el password que viene en el body con el de la base de datos
        // compareSync devuelve un booleano
        const validPassword = bcrypt.compareSync( password, dbUser.password )

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'contraseña incorrecta'
            })
        }

        // genero el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })


    } catch ( error ) {
        return res.json({
            ok: false,
            msg:'login de usuario fallido'
        })
    }

}

const renew = async ( req, res) => {

    const { uid, name } = req;

    const token = await generarJWT( uid, name);

    const dbUser = await Usuario.findById(uid);

    

    return res.json({
        ok: 'true',
        msg:'renovar jsonwebtoken',
        uid,
        name,
        email: dbUser.email,
        token
    })

    
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renew
};