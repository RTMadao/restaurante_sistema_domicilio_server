import {socketDataAccessController} from '../controller/SocketDataAccessController'

export class Socket {

    private _namespace: string
    private _socketServer: any
    private _clientList: Array<any>

    constructor(namespace: string, socketServer: any){
        this._clientList = new Array<any>()
        this._namespace = namespace
        this._socketServer = socketServer
    }


    public listen(){
        this._socketServer.on('connection', async (socket: any) => {
            console.log('Se ha establecido una conexion con un usuario')

            this._socketServer.emit('primeraConexion', await socketDataAccessController.ListData(this._namespace))
            
            this._clientList.push(socket)
        });
    }

    public emitNewPedido(listaPedido: any){
        this._socketServer.emit('pedido', listaPedido)
    } 

    public emitUpdateMenu(menu: any){
        this._socketServer.emit('menu', menu)
    } 

    public emitUpdateDomicilio(listaDomicilio: any){
        this._socketServer.emit('domicilio', listaDomicilio)
    } 

    public get namespace(): string {
        return this._namespace
    }

    public get clientList(): Array<any> {
        return this._clientList
    }
}