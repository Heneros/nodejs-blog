import { body } from "express-validator";

const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
];