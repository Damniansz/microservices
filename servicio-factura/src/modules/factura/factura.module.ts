import { Module } from '@nestjs/common';
import { FacturaController } from './factura.controller.js';
import { FacturaService } from './factura.service.js';
import { ProductoClienteService } from '../../services/producto-cliente.service.js';
import { ClienteServicioService } from '../../services/cliente-servicio.service.js';

@Module({
  controllers: [FacturaController],
  providers: [FacturaService, ProductoClienteService, ClienteServicioService]
})
export class FacturaModule {}
