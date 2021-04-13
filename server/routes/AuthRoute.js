import express from 'express';
import validator from '../middleware/validator';
import UserController from '../controller/AuthController';
import {verifyAuth} from '../middleware/authVerification';

const router = express.Router();

router.post('/auth/signup',validator.newAccountRules(),validator.validateInput, UserController.UserController.signup);
router.post('/auth/signin',validator.newSignInRules(),validator.validateInput, UserController.UserController.signin);
router.post('/auth/change-password',verifyAuth, UserController.UserController.changePassword)


export default router;

