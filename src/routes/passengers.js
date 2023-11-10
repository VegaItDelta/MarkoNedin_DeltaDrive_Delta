import express from "express";
import PassengerController from "../controllers/PassengerController.js";
import {
  createPassengerValidator,
  loginValidator,
  updatePassengerValidator,
  deletePassengerValidator,
} from "../middlewares/validators/passengerValidator.js";
import { validationResult } from "express-validator";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

const passengerController = new PassengerController();

//get passenger history
router.get("/history/:passengerId", auth, async (req, res) => {
  const result = await passengerController.getHistory(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//get all passengers
router.get("/", auth, async (req, res) => {
  const result = await passengerController.getAll(req.query);
  res.status(result.status);
  res.json(result.data);
  return;
});

//get passenger by id
router.get("/:id", auth, async (req, res) => {
  const result = await passengerController.getById(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//create passenger
router.post("/", createPassengerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (errors.length) {
    return res.json(errors).status(400);
  }

  const result = await passengerController.create(req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

//login
router.post("/login", loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (errors.length) {
    return res.json(errors).status(400);
  }

  const result = await passengerController.login(req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

//update passenger
router.patch("/:id", auth, updatePassengerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (errors.length) {
    return res.json(errors).status(400);
  }

  const result = await passengerController.update(req.params, req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

//delete passenger
router.delete("/:id", auth, deletePassengerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (errors.length) {
    return res.json(errors).status(400);
  }

  const result = await passengerController.delete(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

export default router;
