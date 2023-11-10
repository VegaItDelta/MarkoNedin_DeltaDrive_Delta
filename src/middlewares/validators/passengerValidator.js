import { body } from "express-validator";

export const createPassengerValidator = [
  body("email", "Invalid does not Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
  body("firstName", "First name is required").not().isEmpty(),
  body("lastName", "Last name is required").not().isEmpty(),
  body("birthday", "Invalid date format").isDate(),
];

export const loginValidator = [
  body("email", "Invalid does not Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];

export const updatePassengerValidator = [
  body("id", "Id is required field").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
  body("birthday", "Invalid date format").isDate(),
];

export const deletePassengerValidator = [
  body("id", "Id is required field").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
  body("birthday", "Invalid date format").isDate(),
];
