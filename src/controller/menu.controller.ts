import { DBController } from '../DB/DBController';

class MenuController{

    public guardar(dbname: string, plato: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const nuevoPlato = new db.menuModel(plato)
                    const respuesta = await nuevoPlato.save()
                    resolve(respuesta)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public guardarConjunto(dbname: string, menu: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    menu.forEach( async (plato: any,i: number,array: any) => {
                        const nuevoPlato = new db.menuModel(plato)
                        const respuesta = await nuevoPlato.save();
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
                    const menu = await db.menuModel.find()
                    resolve(menu)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public modificar(dbname: string, id: string, plato: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const update = await db.menuModel.updateOne({ '_id': id }, plato)
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
                    const delet = await db.menuModel.deleteOne({ '_id': id })
                    resolve(delet)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

}

export const menuController = new MenuController()