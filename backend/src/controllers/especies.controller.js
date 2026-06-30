import pool from "../config/db.js";

/**
 * Obtener todas las especies
 */
export async function listar(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM species
      ORDER BY common_name ASC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al listar especies:", error);

    res.status(500).json({
      success: false,
      message: "Error al consultar las especies.",
    });
  }
}

/**
 * Crear una nueva especie
 */
export async function crear(req, res) {
  try {
    // Por ahora solo devolvemos un mensaje.
    // El INSERT definitivo lo construiremos cuando
    // tengamos el schema final.
    res.status(201).json({
      success: true,
      message: "Endpoint de creación preparado.",
      data: req.body,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al crear la especie.",
    });
  }
}
