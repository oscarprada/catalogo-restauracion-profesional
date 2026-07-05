import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import speciesRoutes from "./routes/species.routes.js";
import protectedAreasRoutes from "./routes/protectedAreas.routes.js";
import protectedAreaSpeciesRoutes from "./routes/protectedAreaSpecies.routes.js";
import speciesImagesRoutes from "./routes/speciesImages.routes.js";
import speciesUploadRoutes from "./routes/speciesUpload.routes.js";
import path from "path";
import speciesExperiencesRoutes from "./routes/speciesExperiences.routes.js";
import speciesReferencesRoutes from "./routes/speciesReferences.routes.js";
import publicationRoutes from "./routes/publication.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);

app.get("/", (req, res) => {
  res.json({
    application: "Catálogo de Restauración",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");

    res.status(200).json({
      success: true,
      message: "API y PostgreSQL funcionando correctamente.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "No fue posible conectar con PostgreSQL.",
    });
  }
});

app.use("/api/species", speciesRoutes);
app.use("/api/species", speciesImagesRoutes);
app.use("/api/species", speciesUploadRoutes);
app.use("/api/species", speciesExperiencesRoutes);
app.use("/api/species", speciesReferencesRoutes);

app.use("/api/protected-areas", protectedAreasRoutes);
app.use("/api/protected-areas", protectedAreaSpeciesRoutes);

app.use("/api/publications", publicationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log(" Catálogo Restauración");
  console.log("=================================");
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log("=================================");
});

