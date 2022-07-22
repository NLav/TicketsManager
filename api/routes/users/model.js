const Sequelize = require('sequelize');
const instance = require('../../database/index');

const cols = {
  email: {
    type: Sequelize.STRING,
    allownull: false,
  },
  name: {
    type: Sequelize.STRING,
    allownull: false,
  },
  password: {
    type: Sequelize.STRING,
    allownull: false,
  },
  company: {
    type: Sequelize.STRING,
    allownull: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allownull: true,
  },
  tempPassword: {
    type: Sequelize.STRING,
    allownull: true,
  },
  tempPasswordTime: {
    type: Sequelize.DOUBLE,
    allownull: true,
  },
};

const options = {
  freezeTableName: true,
  tableName: 'users',
  timestamps: true,
};

module.exports = instance.define('user', cols, options);
