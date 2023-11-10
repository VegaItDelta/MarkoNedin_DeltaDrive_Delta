import express from "express";
import VehicleController from "../controllers/VehicleController.js";
import {
  createVehicleValidator,
  updateLocationValidator,
} from "../middlewares/validators/vehicleValidator.js";
import { validationResult } from "express-validator";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
const vehicleController = new VehicleController();

//Get all vehicles
router.get("/", auth, (req, res) => {
  const result = vehicleController.getAll(req.query);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Get nearest vehicle
router.get("/nearest", auth, async (req, res) => {
  const result = await vehicleController.getNearest(req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Get vehicle by ID
router.get("/:id", auth, async (req, res) => {
  const result = await vehicleController.getById(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Create vehicle
router.post("/", auth, async (req, res) => {
  const result = await vehicleController.create(req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Update location
router.patch(
  "/location/:id",
  auth,
  updateLocationValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.length) {
      return res.json(errors).status(400);
    }
    const result = await vehicleController.updateLocation(req.params, req.body);
    res.status(result.status);
    res.json(result.data);
    return;
  }
);

//Update vehicle
router.patch("/:id", auth, async (req, res) => {
  const result = await vehicleController.update(req.params, req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Delete vehicle
router.delete("/:id", auth, async (req) => {
  const result = await vehicleController.delete(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

export default router;
