const Sequelize = require('sequelize');

const sequilize = new Sequelize('nodejs', 'root', 'David@250', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequilize;