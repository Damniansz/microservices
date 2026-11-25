import { Injectable, NotFoundException, BadRequestException, ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class ClienteServicioService {
    private readonly url = process.env.CLIENTES_URL;

    async validar(codigo: number): Promise<void> {
        if (!Number.isInteger(codigo) || codigo <= 0) {
            throw new BadRequestException("Código de cliente inválido");
        }

        let respuesta: Response;

        try {
            respuesta = await fetch(`${this.url}${codigo}`);
        } catch {
            throw new ServiceUnavailableException(
                "No se pudo conectar con el servicio de clientes"
            );
        }

        if (respuesta.status === 404) {
            throw new NotFoundException("Cliente no encontrado");
        }

        if (respuesta.status === 400) {
            throw new BadRequestException(
                "No se pudo validar el cliente. Revisa que exista"
            );
        }

        if (!respuesta.ok) {
            throw new ServiceUnavailableException(
                "Error al consultar el servicio de clientes"
            );
        }
    }
}