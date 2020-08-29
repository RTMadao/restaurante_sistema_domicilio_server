import { DBController } from '../DB/DBController';

class DomicilioController{

    public guardar(dbname: string, barrio: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const nuevoBarrio = new db.domicilioModel(barrio)
                    const respuesta = await nuevoBarrio.save()
                    resolve(respuesta)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public guardarConjunto(dbname: string, listaDomicilio: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    listaDomicilio.forEach( async (barrio: any,i: number,array: any) => {
                        const nuevoBarrio = new db.domicilioModel(barrio)
                        const respuesta = await nuevoBarrio.save();
                        if(i == array.length -1) resolve('guardado exitosamente')
                    });
                    
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public listar(dbname: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const listaDomicilio = await db.domicilioModel.find()
                    resolve(listaDomicilio)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public modificar(dbname: string, id: string, barrio: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const update = await db.domicilioModel.updateOne({ '_id': id }, barrio)
                    resolve(update)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public eliminar(dbname: string, id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const delet = await db.domicilioModel.deleteOne({ '_id': id })
                    resolve(delet)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

}

export const domicilioController = new DomicilioController()