import { Router } from "express";

import {
  getSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies
} from "../controllers/species.controller.js";

const router = Router();

/*
 * Especies por área protegida
 */

router.get("/area/:areaId", getSpecies);

router.post("/area/:areaId", createSpecies);

/*
 * Operaciones sobre una especie
 */

router.get("/:id", getSpeciesById);

router.put("/:id", updateSpecies);

router.delete("/:id", deleteSpecies);

export default router;


