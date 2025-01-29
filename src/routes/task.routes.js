import { Router } from "express";
import { createTask, getTasks, deleteTaskById, updateTaskById, updateTaskStatus } from "../controllers/task.controller.js";
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post("/", authRequired, createTask);
router.get("/", authRequired, getTasks);
router.put("/:id", authRequired, updateTaskById);
router.delete("/:id", authRequired, deleteTaskById);
router.put("/status/:id", authRequired, updateTaskStatus);

export default router;