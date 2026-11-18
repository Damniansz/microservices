import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { db } from '../../prisma/db.js';
import { Factura } from '../../models/factura.model.js';
import { DetalleFactura } from '../../models/detalle-factura.model.js';


@Injectable()
export class FacturaService {
    //SOLO FACTURA

    //Crear una nueva factura
    async crear(data: Factura) {
        const factura = await db.orm.Factura.where({ codigo: data.codigo }).first();
        if (!factura) {
            throw new ConflictException("Codigo ya existente");
        }
        return db.orm.Factura.create({ ...data, fecha: new Date(data.fecha) });
    }

    //Listar todas las facturas
    async listar() {
        return db.orm.Factura.all();
    }

    async consultar(codigo: string) {
        const factura = await db.orm.Factura.where({ codigo }).first();
        if (!factura) {
            throw new NotFoundException("Factura no encontrada");
        }
        return factura;
    }

    //Actualizar: PATCH
    async actualizar(codigo: string, data: Partial<Factura>) {
        const cambios: Record<string, unknown> = {...data}; //Graba los cambios que se van a realizar
        if(data.fecha){
            cambios.fecha = new Date(data.fecha);
        }
        const factura = await db.orm.Factura.where({ codigo: codigo }).update(cambios);

        if (!factura) {
            throw new NotFoundException("Factura no encontrada");
        }
        return factura;
    }

    //Eliminar
    async eliminar(codigo: string) {
        await this.consultar(codigo);
        await db.orm.Factura.where({ codigo }).delete();
        return { message: "Factura eliminada correctamente" };
    }

    //SOLO DETALLES DE FACTURA

    async agregarDetalle(codigo: string, data: DetalleFactura) {
        
    }

    // Actualizar detalle: PATCH
    async actualizarDetalle(){

    }

    // Eliminar detalle
    async eliminarDetalle(){
        
    }

}
