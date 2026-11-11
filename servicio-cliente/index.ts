import fastify from "fastify";
import {sequelize} from "./src/config/database";
import { clienteRouter } from "./src/routes/cliente.routes";

const app = fastify({
    logger: true
});

app.register(clienteRouter, {prefix: "/api"});

const PORT = Number (process.env.PORT) || 3001

const iniciar = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();

        await app.listen({
            port: PORT, 
            host: "0.0.0.0" //Permitir todas las conexiones
        });
        console.log("Microservicio corriendo en el puerto: " + PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

iniciar();