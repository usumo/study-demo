//定义表结构
const Sequelize = require('sequelize');
const sequelize = require('./db');
const Staff = sequelize.define('staff', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sex: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  dob: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Staff;