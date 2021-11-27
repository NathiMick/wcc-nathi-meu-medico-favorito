const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../data/db");

const Doctor = database.define('Doctor', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    crm: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    speciality: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    clinic: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    favorite: {
        type: DataTypes.BOOLEAN
    }
});

Doctor.sync();

module.exports = Doctor;