import express from "express";
import BookingController from "../controllers/BookingController.js";
import {
  completeBooking,
  createBooking,
} from "../middlewares/validators/bookingValidator.js";
import { validationResult } from "express-validator";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
const bookingController = new BookingController();

//Get all bookings
router.get("/", auth, async (req, res) => {
  const result = await bookingController.getAll(req.query);
  res.status(result.status);
  res.json(result.data);
  return;
});

//get booking by id
router.get("/:id", auth, async (req, res) => {
  const result = await bookingController.getById(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Create booking
router.post("/", auth, createBooking, async (req, res) => {
  const errors = validationResult(req);
  if (errors.length) {
    return res.json(errors).status(400);
  }

  const result = await bookingController.bookRide(req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Accept booking
router.patch("/accept/:id", auth, async (req, res) => {
  const result = await bookingController.acceptRide(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Reject booking
router.patch("/reject/:id", auth, async (req, res) => {
  const result = await bookingController.rejectRide(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Booking in progress
router.patch("/in-progress/:id", auth, async (req, res) => {
  const result = await bookingController.rideInProgress(req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Booking copleted
router.patch("/complete/:id", completeBooking, auth, async (req, res) => {
  const errors = validationResult(req);
  if (errors.length) {
    return res.json(errors).status(400);
  }
  const result = await bookingController.completedRide(req.body, req.params);
  res.status(result.status);
  res.json(result.data);
  return;
});

//Delete booking
router.delete("/:id", auth, async (req, res) => {
  const result = await bookingController.delete(req.body);
  res.status(result.status);
  res.json(result.data);
  return;
});

export default router;
