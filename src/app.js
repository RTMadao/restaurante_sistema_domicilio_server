const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

//importar rutas
const pedidoRoutes = require('./routes/pedido.routes');
const menuRoutes = require('./routes/menu.routes');
const reporteRoutes = require('./routes/reporte.routes');
const domicilioRoutes = require('./routes/domicilio.router');

const app = express();

mongoose.connect('mongodb://localhost/rico_mondongo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('conectado correctamente a la base de datos'))
.catch(err => console.log('error al conectar base de datos '+err))

//configuracion servidor
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev')) //indica informacion de las peticiones realizadas tiempo y peso
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false})) //para recibir json en las peticiones del navegador

//rutas
app.use('/pedido',pedidoRoutes)
app.use('/menu',menuRoutes)
app.use('/reporte',reporteRoutes)
app.use('/domicilio',domicilioRoutes)

//start server
app.listen(app.get('port'),() => {
    console.log(`server on port  ${app.get('port')}`)
})