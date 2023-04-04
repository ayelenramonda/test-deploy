import { Router } from 'express';
import passport from 'passport';
import {signUp, login, getHome, logout } from '../controller/user.js';
import {isLoggedIn } from '../middleweare/auth.js'


const router = Router();
const passportOptions = { badRequestMessage: 'falta usuario/pass' }

router.post('/login', passport.authenticate('login', passportOptions), login);
router.post("/signup", signUp );
router.get('/home', isLoggedIn, getHome )
router.post("/logout", isLoggedIn, logout);



export default router;