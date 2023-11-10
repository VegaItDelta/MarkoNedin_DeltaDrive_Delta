import db from "./src/models/index.js";
import express from "express";
import passengerRoutes from "./src/routes/passengers.js";
import vehicleRoutes from "./src/routes/vehicle.js";
import bookingRoutes from "./src/routes/booking.js";
const app = express();

// Povezivanje sa rutama

app.use(express.json());
app.use("/passenger", passengerRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/booking", bookingRoutes);

// Postavke servera
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT} port`);
});
await db.authenticate();
await db.sync();
