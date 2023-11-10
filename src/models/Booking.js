import Sequelize from "sequelize";
import db from "./index.js";
import Passenger from "./Passenger.js";
import Vehicle from "./Vehicle.js";

const Booking = db.define(
  "Booking",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    startingPrice: Sequelize.STRING,
    pricePerKm: Sequelize.STRING,
    rate: Sequelize.FLOAT,
    comment: {
      type: Sequelize.STRING,
      required: false,
    },
    vehicleId: {
      type: Sequelize.INTEGER,
      // foreignKey: true,
    },
    passengerId: {
      type: Sequelize.INTEGER,
      // foreignKey: true,
    },
    status: Sequelize.ENUM([
      "PENDING",
      "ACCEPTED",
      "IN_PROGRESS",
      "REJECTED",
      "COMPLETED",
    ]),
  },
  { timestamps: false }
);

Passenger.hasMany(Booking, {
  foreignKey: "passengerId",
});
Booking.belongsTo(Passenger, {
  foreignKey: "passengerId",
});

Vehicle.hasMany(Booking, {
  foreignKey: "vehicleId",
});
Booking.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
});

export default Booking;
