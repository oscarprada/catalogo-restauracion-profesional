import { Router } from "express";
import {
  getSpeciesReferences,
  createSpeciesReference
} from "../controllers/speciesReferences.controller.js";

const router = Router();

router.get(
  "/:id/references",
  getSpeciesReferences
);

router.post(
  "/:id/references",
  createSpeciesReference
);

export default router;

