import express from 'express'
import {DBController} from './DB/DBController'
import {SocketController} from './socket/socket.controller'
import morgan from 'morgan'
import cors from 'cors'

//routes import
import {pedidoRoutes} from './routes/pedido.routes'
import {menuRoutes} from './routes/menu.routes'
import {domicilioRoutes} from './routes/domicilio.routes'
import {reporteRoutes} from './routes/reporte.routes'

const app = express();

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
// app.use('/configuracion',configuracionRoutes)

//start server
const server = app.listen(app.get('port'),() => {
    console.log('server on port',app.get('port'))
})

//DB
DBController.getInstance().listClients()
.then(listClients => {
    //start websocket
    SocketController.getInstance().start(server, listClients)
})