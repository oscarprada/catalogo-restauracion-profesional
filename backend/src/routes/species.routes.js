import { Router } from "express";
import {
  getSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies
} from "../controllers/species.controller.js";

const router = Router();

router.get("/", getSpecies);
router.get("/:id", getSpeciesById);
router.post("/", createSpecies);
router.put("/:id", updateSpecies);
router.delete("/:id", deleteSpecies);

export default router;

