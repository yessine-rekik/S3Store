import express from 'express';
import controllers from '../controllers';
import { validate } from '../middlewares/validate';
import { loginValidators } from '../validators/login.validators';
import { registerValidators } from '../validators/register.validators';

const router = express.Router();

router.post('/register', validate(registerValidators), controllers.register);

router.post('/login', validate(loginValidators), controllers.login);

router.post('/logout', controllers.logout);

router.post('/refresh-token', controllers.refreshTokens);

export default router;
