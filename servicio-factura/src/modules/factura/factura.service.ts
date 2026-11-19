import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { db } from '../../prisma/db.js';
import { Factura } from '../../models/factura.model.js';
import { DetalleFactura } from '../../models/detalle-factura.model.js';
import { ProductoClienteService } from '../../services/producto-cliente.service.js';

@Injectable()
export class FacturaService {
    //Constructor para inyectar el servicio de productos
    constructor(
        private readonly productoClienteService: ProductoClienteService
    ) { };

    //SOLO FACTURA

    //Crear una nueva factura
    async crear(data: Factura) {
        const factura = await db.orm.Factura.where({ codigo: data.codigo }).first();
        if (factura) {
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
        const cambios: Record<string, unknown> = { ...data }; //Graba los cambios que se van a realizar
        if (data.fecha) {
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

    async agregarDetalle(codigo: string, detalle: DetalleFactura) {
        const factura = await this.consultar(codigo);
        const subtotal = await this.calcularSubtotal(detalle.cantidad, detalle.cod_producto);

        return db.orm.Factura.where({codigo}).update({detalles_factura:[...factura.detalles_factura,{...detalle, subtotal}]});
    }

    // Actualizar detalle: PATCH
    async actualizarDetalle(codigo: string, detalleCodigo: number, data: Partial<DetalleFactura>) {
        const factura = await this.consultar(codigo);
        const detalle = factura.detalles_factura.find(d => d.codigo === detalleCodigo);

        if (!detalle) {
            throw new NotFoundException("Detalle de factura no encontrado");
        }

        if (data.cantidad === undefined){
            return factura
        }

        const cantidad = data.cantidad;
        const subtotal = await this.calcularSubtotal(cantidad, detalle.cod_producto);

        const detalles = factura.detalles_factura.map(d => d.codigo === detalleCodigo ? { ...d, cantidad, subtotal } : d);
        await db.orm.Factura.where({ codigo }).update({ detalles_factura: detalles });

        return this.consultar(codigo);
    }

    // Eliminar detalle
    async eliminarDetalle(codigo: string, codigoDetalle: number) {
        const factura = await this.consultar(codigo);
        const detalle = factura.detalles_factura.filter(d => d.codigo !== codigoDetalle);

        if (!detalle){
            throw new NotFoundException("Detalle de factura no encontrado");
        }

        return db.orm.Factura.where({ codigo }).update({ detalles_factura: factura.detalles_factura.filter(d => d.codigo !== codigoDetalle) });
    }

    public async calcularSubtotal(cantidad: number, cod_producto: number,): Promise<number> {
        const producto = await this.productoClienteService.consultar(cod_producto);
        return cantidad * producto.precio;
    }

}
