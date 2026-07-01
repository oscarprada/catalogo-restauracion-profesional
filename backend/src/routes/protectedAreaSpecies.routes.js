import { Router } from "express";
import {
  getSpeciesByProtectedArea,
  createSpecies
} from "../controllers/protectedAreaSpecies.controller.js";

const router = Router();

router.get("/:id/species", getSpeciesByProtectedArea);
router.post("/:id/species", createSpecies);

export default router;
