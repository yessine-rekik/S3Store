import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.post('/register', controllers.register);

router.post('/login', controllers.login);

router.post('/logout', controllers.logout);

router.post('/refresh-token', controllers.refreshTokens);

export default router;
