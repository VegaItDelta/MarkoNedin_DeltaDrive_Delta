import { body } from "express-validator";

export const createVehicleValidator = [
  body("email", "Invalid does not Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];

export const updateLocationValidator = [
  body("lat", "lat is required parameter").not().isEmpty(),
  body("log", "log is required parameter").not().isEmpty(),
  body("lat", "lat should be string").isString(),
  body("log", "lat should be string").isString(),
];
