const Sequelize = require('sequelize');
const instance = require('../../database/index');

const cols = {
  subject: {
    type: Sequelize.STRING,
    allownull: false,
  },
  priority: {
    type: Sequelize.STRING,
    allownull: false,
  },
  description: {
    type: Sequelize.STRING,
    allownull: false,
  },
  status: {
    type: Sequelize.STRING,
    allownull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allownull: false,
  },
};

const options = {
  freezeTableName: true,
  tableName: 'tickets',
  timestamps: true,
};

module.exports = instance.define('ticket', cols, options);
