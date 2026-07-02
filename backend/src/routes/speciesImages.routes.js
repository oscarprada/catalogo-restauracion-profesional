import { Router } from "express";
import { getSpeciesImages } from "../controllers/speciesImages.controller.js";

const router = Router();

router.get("/:id/images", getSpeciesImages);

export default router;

