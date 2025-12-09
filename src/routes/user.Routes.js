import {Router} from "express";
import {getUsers, getUser, addUser,  modifyUser, removeUser } from "../controllers/userControllers.js";
import { verifyToken, adminOnly } from "../middlewares/authMiddleware.js";



const router = Router();

// Rutas para usuarios

router.get("/",verifyToken, adminOnly, getUsers);
router.post("/", verifyToken, adminOnly,addUser);
router.get("/:id",verifyToken, getUser);
router.put("/:id",verifyToken, adminOnly, modifyUser);
router.delete("/:id", verifyToken, adminOnly,removeUser);

export default router;