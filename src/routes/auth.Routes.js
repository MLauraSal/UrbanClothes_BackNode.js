import { Router } from "express";
import { login, register } from "../controllers/authControllers.js";


export const router = Router();

// Rutas de autenticación

router.post("/register", register);
router.post("/login", login);

export default router;