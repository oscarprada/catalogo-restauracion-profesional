import { Router } from "express";
import { publishProtectedArea } from "../controllers/publication.controller.js";

const router = Router();

router.get(
    "/:id",
    publishProtectedArea
);

export default router;

