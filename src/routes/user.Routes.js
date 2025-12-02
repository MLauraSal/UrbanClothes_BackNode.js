import {Router} from "express";
import {getUsers, getUser, addUser,  modifyUser, removeUser} from "../controllers/userControllers.js";



const router = Router();


router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", modifyUser);
router.delete("/:id", removeUser);

export default router;