
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Cliente = sequelize.define("Cliente", {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    }
}, {
    tableName: "cliente",
    timestamps: false
});

export default Cliente;
