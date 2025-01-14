import {Router} from "express";

import { getAll,getById,update,updatePassword,signUp,Login,deleteById } from "../controllers/user.js"

const router = Router();
router.get("/", getAll)
router.get("/:id", getById)
router.delete("/:id", deleteById)
router.put("/:id", update)
router.put("/updatePassword/:id", updatePassword); // עדכון סיסמה
router.post("/signup", signUp); // הרשמה
router.post("/login", Login); // התחברות

export default router;