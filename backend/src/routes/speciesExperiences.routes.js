import { Router } from "express";
import {
  getSpeciesExperiences,
  createSpeciesExperience
} from "../controllers/speciesExperiences.controller.js";

const router = Router();

router.get(
  "/:id/experiences",
  getSpeciesExperiences
);

router.post(
  "/:id/experiences",
  createSpeciesExperience
);

export default router;

