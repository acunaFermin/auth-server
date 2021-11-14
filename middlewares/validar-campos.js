const { validationResult } = require('express-validator');
const { response } = require('express')

const validarCampos = ( req, res = response, next ) => {

    const errors = validationResult( req );

    if(!errors.isEmpty()){
        return res.status( 401 ).json({
            ok: 'false',
            msg: errors.mapped()
        })
    }

    next();
};

module.exports = { validarCampos };