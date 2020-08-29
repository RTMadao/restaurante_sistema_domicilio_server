import {pedidoController} from './pedido.controller'
import {menuController} from './menu.controller'
import {domicilioController} from './domicilio.controller'

class SocketDataAccessController{

    constructor(){}

    ListData(dbname: string){
        return new Promise(async (resolve, reject) => {
            try {
                const pedido = await pedidoController.listar(dbname)
                const menu = await menuController.listar(dbname)
                const domicilio = await domicilioController.listar(dbname)
                resolve({pedidos: pedido, menu: menu, domicilio: domicilio})
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }


}

export const socketDataAccessController = new SocketDataAccessController()