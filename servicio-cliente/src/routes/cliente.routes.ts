import type { FastifyInstance } from "fastify";
import { obtenerClienteId, obtenerClientes, crearCliente, actualizarCliente, eliminarCliente } from "../controllers/cliente.controller";

export const clienteRouter = (app : FastifyInstance) => {
    app.get("/clientes", obtenerClientes);

    app.get("/clientes/:id", async (req, res) => {
        try {
            const {id} = req.params as any;
            return await obtenerClienteId(id);
        } catch (error) {
            console.log("Error al obtener todos los datos los clientes");
            res.code(400).send({error: "Error al obtener cliente"});
        }
    });

    app.post("/clientes", async (req, res) => {
        try {
            const cliente = req.body
            return await crearCliente(cliente);
        } catch (error) {
            console.log("Error al crear cliente");
            res.code(400).send({error: "Error al crear cliente"});
        }
    });

    app.put("/clientes/:id", async (req, res) => {
        try {
            const {id} = req.params as any;
            const cliente = req.body;
            return await actualizarCliente(id, cliente);
        } catch (error) {
            console.log("Error al actualizar cliente");
            res.code(400).send({error: "Error al actualizar cliente"});
        }
    });

    app.delete("/clientes/:id", async (req, res) => {
        try {
            const {id} = req.params as any;
            return await eliminarCliente(id);
        } catch (error) {
            console.log("Error al eliminar cliente");
            res.code(400).send({error: "Error al eliminar cliente"});
        }
    });
}