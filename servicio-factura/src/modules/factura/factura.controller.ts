import { Controller, Get, Post, Put, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { FacturaService } from './factura.service.js';

@Controller('factura')
export class FacturaController {
    constructor(
        private readonly facturaService: FacturaService,
    ) { }

    // FACTURAS

    @Get(':codigo')
    consultar(@Param('codigo') codigo: string) {
        return this.facturaService.consultar(codigo);
    }

    @Post()
    crear(@Body() data: any) {
        return this.facturaService.crear(data);
    }

    @Put(':codigo')
    actualizar(
        @Param('codigo') codigo: string,
        @Body() data: any,
    ) {
        return this.facturaService.actualizar(codigo, data);
    }

    @Patch(':codigo')
    modificar(
        @Param('codigo') codigo: string,
        @Body() data: any,
    ) {
        return this.facturaService.actualizar(codigo, data);
    }

    @Delete(':codigo')
    eliminar(@Param('codigo') codigo: string) {
        return this.facturaService.eliminar(codigo);
    }

    // DETALLES DE FACTURA

    @Post(':codigo/detalle')
    agregarDetalle(
        @Param('codigo') codigo: string,
        @Body() detalle: any,
    ) {
        return this.facturaService.agregarDetalle(codigo, detalle);
    }

    @Patch(':codigo/detalle/:codigoDetalle')
    actualizarDetalle(
        @Param('codigo') codigo: string,
        @Param('codigoDetalle', ParseIntPipe) codigoDetalle: number,
        @Body() data: any,
    ) {
        return this.facturaService.actualizarDetalle(
            codigo,
            codigoDetalle,
            data,
        );
    }

    @Delete(':codigo/detalle/:codigoDetalle')
    eliminarDetalle(
        @Param('codigo') codigo: string,
        @Param('codigoDetalle', ParseIntPipe) codigoDetalle: number,
    ) {
        return this.facturaService.eliminarDetalle(codigo, codigoDetalle);
    }
}