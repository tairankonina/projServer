import {Router} from "express";
;

import { deleteById, getAll, getById, update, add } from "../controllers/order.js"

const router = Router();
router.get("/", getAll)
router.get("/:userId", getById)
router.delete("/:id", deleteById)
router.put("/:id", update)
router.post("/", add)

export default router;

