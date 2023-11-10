import Sequelize from "sequelize";
import db from "./index.js";

const Vehicle = db.define(
  "Vehicle",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    brand: Sequelize.STRING,
    driverFirstName: Sequelize.STRING,
    driverLastName: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    startPrice: Sequelize.STRING,
    pricePerKM: Sequelize.STRING,
    available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    averageRating: Sequelize.FLOAT,
  },
  { timestamps: false }
);
export default Vehicle;
