import { Router } from "express";
import {
  getSpeciesImages,
  deleteSpeciesImage
} from "../controllers/speciesImages.controller.js";

const router = Router();

router.get("/:id/images", getSpeciesImages);

router.delete(
  "/images/:imageId",
  deleteSpeciesImage
);

export default router;
