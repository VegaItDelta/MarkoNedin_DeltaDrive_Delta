import db from "./index.js";
import Sequelize from "sequelize";

const Passenger = db.define(
  "Passengers",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    birthday: Sequelize.DATE,
  },
  { timestamps: false }
);

export default Passenger;
