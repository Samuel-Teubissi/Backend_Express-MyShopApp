import express from 'express'
import { API_logged, API_Login, API_logout, API_Register } from './authController.js'
import { validateLogin, validateRegister } from '../middlewares/validateAuth.js'
import upload from '../middlewares/fromParser.js'

const router = express.Router()

router.post('/login', upload.none(), validateLogin, API_Login)
router.post('/register', upload.none(), validateRegister, API_Register)
router.get('/logged', API_logged)
router.get('/logout', API_logout)

export default router;