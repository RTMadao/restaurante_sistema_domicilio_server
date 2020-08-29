import mongoose from 'mongoose'

export class DBConnection {
    private _connection: any
    private _dbName: string
    private _pedidoModel: any
    private _menuModel: any
    private _domicilioModel: any
    private _reporteDiarioModel: any
    private _configuracionModel: any

    constructor(dbName: string){
        this._dbName = dbName
    }

    public startConnection(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            mongoose.createConnection(key, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(db => {
                this._connection = db
                console.log(`conectado correctamente a la base de datos ${this._dbName}`)
                resolve(true)
            })
            .catch(err => {
                console.log(`error al conectar base de datos ${this._dbName} `+err)
                reject(false)
            })
        })
    }

    public setModels(schemaPedido: any, schemaMenu: any, schemaDomicilio: any, schemaReporte: any, schemaConfiguracion: any){
        this._pedidoModel = this._connection.model('Pedidos',schemaPedido)
        this._menuModel = this._connection.model('Menus',schemaMenu)
        this._domicilioModel = this._connection.model('Domicilios',schemaDomicilio)
        this._reporteDiarioModel = this._connection.model('reporteDias',schemaReporte)
        this._configuracionModel = this._connection.model('Configuracions',schemaConfiguracion)
    }

    public get dbName() : string {
        return this._dbName
    }

    public get connection() : any {
        return this._connection
    }

    public get pedidoModel() : any {
        return this._pedidoModel
    }
    
    public get menuModel() : any {
        return this._menuModel
    }

    public get domicilioModel() : any {
        return this._domicilioModel
    }

    public get reporteDiarioModel() : any {
        return this._reporteDiarioModel
    }

    public get configuracionModel() : any {
        return this._configuracionModel
    }

    public set pedidoModel(pedidoModel: any){
        this._pedidoModel = pedidoModel
    }
    
    public set menuModel(menuModel: any){
        this._menuModel = menuModel
    }

    public set domicilioModel(domicilioModel: any){
        this._domicilioModel = domicilioModel
    }

    public set reporteDiarioModel(reporteDiarioModel: any){
        this._reporteDiarioModel = reporteDiarioModel
    }

    public set configuracionModel(configuracionModel: any){
        this._configuracionModel = configuracionModel
    }
}