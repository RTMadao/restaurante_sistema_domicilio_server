const mongoose = require('mongoose')
const Schema = mongoose.Schema;

export var ReporteDiario = new Schema({
    fecha: { type: Date, default: Date.now },
    platosVendidos:[
        {
            nombre: String,
            total: Number,
            cantidad: Number
        }
    ],
    subtotalVenta: Number,
    descuentos: Number,
    totalVendido: Number,
    totalDomicilio: Number
})

ReporteDiario.methods.addItem = function (platoVenta: {nombre:string, total:number,cantidad: number}){
    if (this.platosVendidos.length == 0) {
        this.platosVendidos.push(platoVenta)
        this.subtotalVenta = platoVenta.total
    }else{
        const index = this.platosVendidos.findIndex((plato: any) => plato.nombre == platoVenta.nombre)
        if (index >= 0) {
            this.platosVendidos[index].cantidad += platoVenta.cantidad
            this.platosVendidos[index].total += platoVenta.total
            this.subtotalVenta += platoVenta.total
        } else {
            this.platosVendidos.push(platoVenta)
            this.subtotalVenta += platoVenta.total
        }
    }
    
}

ReporteDiario.methods.addValorDomicilio = function (valorDomicilio: number){
    if(this.totalDomicilio == undefined) this.totalDomicilio = valorDomicilio
    else this.totalDomicilio += valorDomicilio
}

ReporteDiario.methods.addDescuento = function (descuento: number){
    if(this.descuentos == undefined) this.descuentos = descuento
    else this.descuentos += descuento
}

ReporteDiario.methods.setTotalVentas = function (){
    this.totalVendido = this.subtotalVenta - this.descuentos
}

