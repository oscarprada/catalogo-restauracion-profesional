import { Router } from "express";
import {
  getProtectedAreas,
  getProtectedAreaById,
  createProtectedArea,
  updateProtectedArea,
  deleteProtectedArea,
} from "../controllers/protectedAreas.controller.js";

const router = Router();

router.get("/", getProtectedAreas);
router.get("/:id", getProtectedAreaById);
router.post("/", createProtectedArea);
router.put("/:id", updateProtectedArea);
router.delete("/:id", deleteProtectedArea);

export default router;
