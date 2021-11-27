require('dotenv').config();
const { Sequelize } = require("sequelize");

const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
        
    },
});

database.authenticate()
.then(() => console.log("DB connected"))
.catch(() => console.log("DB not connected"));

module.exports = {
    database
};