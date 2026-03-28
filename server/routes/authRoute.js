import express from 'express'
import { getMe, login, logout, register } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authmiddlware.js'

const router = express.Router()


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", authMiddleware, getMe);




export default router