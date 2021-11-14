const { Router } = require('express');
const {crearUsuario, loginUsuario, renew} = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//crear usuario
router.post( '/new',[
    //middlewares que se ejecutan antes del controlador crearUsuario
    //los middlewares se ejecutan de manera secuencial
    check('email','introduzca un email correcto').isEmail(),
    check('name','el nombre es obligatorio').isLength(3),
    check('password','la contraseña debe superar los 6 caracteres').isLength({min: 6}),
    validarCampos
] ,  crearUsuario );


//login de usuario
router.post( '/', [
    //middlewares que se ejecutan antes del controlador
    check('email','introduzca un email correcto').isEmail(),
    check('name','el nombre es obligatorio').isLength(3),
    check('password','la contraseña debe superar los 6 caracteres').isLength({min: 6}),
    validarCampos
] , loginUsuario );

//renovar el JWT
router.get( '/renew', [
    validarJWT
], renew );












module.exports = router;