const Sequelize = require('sequelize');
const sequelize = new Sequelize("project_cesar", "root", "carlos", { 
    port: 3306, 
    host: "localhost",
    dialect: 'mysql',
});

module.exports = sequelize; 
