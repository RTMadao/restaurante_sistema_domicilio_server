import { DBConnection } from './DBConnection'
import mongoose from 'mongoose'
import {key} from './key'
import {Pedido, Domicilio, Menu, ReporteDiario, Configuracion, client_db} from '../model/models'

export class DBController {
    private _adminDB: any
    private _clientDBModel: any
    private _listConnections: Array<DBConnection>
    private static _instance: DBController

    constructor(){
        this._listConnections = new Array<DBConnection>()
        mongoose.createConnection(key, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(db => {
            console.log(`conectado correctamente a la base de datos administradora`)
            this._adminDB = db
            this._clientDBModel = this._adminDB.model('client_dbs',client_db)
            this.upAllConnections()
        })
        .catch(err => console.log(`error al conectar base de datos administradora `+err))
    }

    public static getInstance(): DBController {
        if (!this._instance) {
            this._instance = new DBController();
        }
        return this._instance;
    }

    public createNewConnection(): void {

    }

    public async upAllConnections(): Promise<void> {
        const listaDB = await this._clientDBModel.find()
        listaDB.forEach(async (DB: any) => {
            let conn = new DBConnection(DB.dbname)
            const connectionCreated = await conn.startConnection(DB.key)
            if (connectionCreated) {
                conn.setModels(Pedido, Menu, Domicilio, ReporteDiario, Configuracion)
                this._listConnections.push(conn)
            }
        });
        
    }

    public get listConnections() : Array<DBConnection> {
        return this._listConnections
    }

    public listClients(): Promise<Array<string>> {
        return new Promise ((resolve, reject) => {
            this.isReady()
            .then(async respuesta => {
                resolve(await this._clientDBModel.find({}, 'dbname'))
            })
        })
    }

    public isReady(): Promise<boolean>{
        return new Promise (async (resolve, reject) => {
            let isready = false
            while (!isready) {
                isready = await this.prueba() 
                resolve(isready)
            }
         })
    }

    private prueba(): Promise<boolean> {
        return new Promise (async (resolve, reject) => {
            setTimeout(() => {
                if (this._clientDBModel != undefined){
                    resolve(true)
                } 
            }, 2000);
         })
    }

    public getConnection(dbname: string): DBConnection | undefined {
        return this._listConnections.find(conn => conn.dbName == dbname)
    }
}