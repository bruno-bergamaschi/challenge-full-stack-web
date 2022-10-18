const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Students = sequelize.define('students', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ra: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Students;
