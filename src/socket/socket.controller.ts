import socketIO from 'socket.io';
import {Socket} from './socket'

export class SocketController {

    private io: any
    private _socketList: Array<any>
    private static _instance: SocketController

    constructor(){
        this._socketList = new Array<any>()
    }

    public static getInstance(): SocketController {
        if (!this._instance) {
            this._instance = new SocketController();
        }
        return this._instance;
    }

    public start(server: any, listConnections: any): void {
        this.io = socketIO(server)

        listConnections.forEach(async (conn: any) => {
            const nsp = new Socket(conn.dbname, this.io.of(`/${conn.dbname}`))
            nsp.listen()
            
            this._socketList.push(nsp)
        })
    }

    public getSocket(dbname: string): Socket | undefined {
        return this._socketList.find(socket => socket.namespace == dbname)
    }
}