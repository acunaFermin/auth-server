const express = require ('express');
const cors = require ('cors');
const dbConnection = require('./db/config');
require('dotenv').config(); // toma la config por defect del archivo de enviroments

//crear app express

const app = express();

//base de datos
dbConnection();

//DIRECTORIO OPUBLICO
app.use( express.static('public') );



//cors
app.use ( cors() );


// lectura y parseo del body
app.use( express.json() ); // ya viene con express




app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
} );


// app.get ('/', ( req, res) =>{
//     console.log('holis')

//     res.status( 200 ).json({
//         ok: 'todo salio bien'
//     })
// })


//middleware para redirigir las consultas a './routes/auth
app.use(  '/api/auth', require('./routes/auth'));