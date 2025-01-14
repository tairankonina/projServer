import {Router} from "express";

import { deleteById, getAll, getById, update, add } from "../controllers/product.js"

const router = Router();
router.get("/", getAll)
router.get("/:id", getById)
router.delete("/:id", deleteById)
router.put("/:id", update)
router.post("/", add)

export default router;