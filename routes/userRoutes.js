import express from 'express';

import { signup, signin } from '../controllers/userController.js';

import { signUpValidation, signInValidation } from '../validations/authValidation.js';
import { handleErrors } from '../middlewares/index.js';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signInValidation, handleErrors, signin);

export default router;