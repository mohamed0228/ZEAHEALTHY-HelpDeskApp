// models/ticketModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Ticket = sequelize.define("Ticket", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("new", "in_progress", "resolved"),
    defaultValue: "new",
  },
  response: {
    type: DataTypes.TEXT,
  },
});

module.exports = Ticket;
