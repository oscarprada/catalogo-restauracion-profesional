import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import especiesRoutes from "./routes/especies.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

app.use("/api/especies", especiesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log(" Catálogo Restauración");
  console.log("=================================");
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log("=================================");
});

