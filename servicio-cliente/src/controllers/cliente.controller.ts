import Cliente from "../models/cliente.model";

export const obtenerClientes = async () =>{
    return Cliente.findAll();
}

export const obtenerClienteId = async (id: number) =>{
    const cliente = await Cliente.findByPk(id);
    if (!cliente){
        throw Error("Cliente no encontrado");
    }

    return cliente;
}

export const crearCliente = async (data: any) => {
    if (!data) {
        throw Error("Datos incorrectos");
    }

    if (typeof data.nombre !== "string" || !data.nombre.trim()) {
        throw Error("El nombre es obligatorio");
    }

    if (typeof data.direccion !== "string" || !data.direccion.trim()) {
        throw Error("La dirección es obligatoria");
    }

    if (typeof data.telefono !== "string" || !data.telefono.trim()) {
        throw Error("El telefono es obligatorio y debe enviarse como texto");
    }

    if (!/^[0-9]{10}$/.test(data.telefono.trim())) {
        throw Error("El telefono debe tener exactamente 10 digitos");
    }

    const cliente = await Cliente.create({
        nombre: data.nombre.trim(),
        direccion: data.direccion.trim(),
        telefono: data.telefono.trim(),
    });

    return cliente;
};

export const actualizarCliente = async (id: number,data: any) => {
    const cliente = await Cliente.findByPk(id);
    if(!cliente){
        throw Error("Cliente no encontrado");
    }
    await cliente.update(data);
    return cliente;
}

export const eliminarCliente = async (id: number) => {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw Error("Cliente no encontrado");
    }

    await cliente.destroy();
    return { mensaje: "Eliminado correctamente" };
};