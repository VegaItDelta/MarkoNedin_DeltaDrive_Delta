import { body } from "express-validator";

export const createBooking = [
  body("email", "email is required field").not().isEmpty(),
  body("email", "Please provide valid email value").isEmail(),
  body("vehicleId", "vehicleId is required field").not().isEmpty(),
  body("vehicleId", "vehicleId must be number").isNumeric(),
];

export const completeBooking = [
  body("bookingId", "Please provide valid bookingId").isNumeric(),
  body("bookingId", "bookingId is required field").not().isEmpty(),
  body("comment", "Please provide valid comment").isString(),
  body("rating", "Please provide valid rating").isString(),
];
