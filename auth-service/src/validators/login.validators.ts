import { body } from 'express-validator';

export const loginValidators = [
  body('username')
    .exists({ values: 'falsy' })
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string'),
  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string'),
];
