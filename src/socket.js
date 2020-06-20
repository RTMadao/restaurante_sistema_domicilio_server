const socketIO = require('socket.io')
const Pedido = require('./model/Pedido');
const Domicilio = require('./model/Domicilio');
const Menu = require('./model/Menu');

class SocketController {

    constructor(){
        this.io
    }

    start(server){
        this.io = socketIO(server)
        this.io.on('connection', async (socket) => {
            console.log('Se ha establecido una coneccion con un usuario');
            const pedidos = await Pedido.find()
            const menu = await Menu.find()
            const domicilios = await Domicilio.find()
            socket.emit('loadData', {
                pedidos: pedidos,
                domicilios: domicilios,
                menu: menu
            })
        });
        
    }

    sendPedido(listaPedidos){
        this.io.sockets.emit('updatePedido',listaPedidos)
    }

    sendMenu(menu){
        this.io.sockets.emit('updateMenu',menu) 
    }

    sendDomicilio(listaDomicilio){
        this.io.sockets.emit('updateDomicilio',listaDomicilio)
    }

}

module.exports = new SocketController()