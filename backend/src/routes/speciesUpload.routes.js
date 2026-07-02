import { Router } from "express";
import upload from "../config/multer.js";
import { uploadSpeciesImage } from "../controllers/speciesUpload.controller.js";

const router = Router();

router.post(
  "/:id/images",
  upload.single("image"),
  uploadSpeciesImage
);

export default router;
