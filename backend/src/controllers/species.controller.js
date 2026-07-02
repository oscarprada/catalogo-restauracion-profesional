import { query } from "../config/db.js";

/**
 * Obtener todas las especies
 */
export async function getSpecies(req, res) {
  try {
    const result = await query(`
      SELECT *
      FROM protected_area_species
      WHERE is_active = TRUE
      ORDER BY common_name;
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

/**
 * Obtener una especie por ID
 */
export async function getSpeciesById(req, res) {
  try {

    const { id } = req.params;

    const result = await query(
      `
      SELECT *
      FROM protected_area_species
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Especie no encontrada."
      });
    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}

/**
 * Crear especie
 */
export async function createSpecies(req, res) {

  res.status(501).json({
    success: false,
    message: "Pendiente de implementar."
  });

}

/**
 * Actualizar especie
 */
export async function updateSpecies(req, res) {

  res.status(501).json({
    success: false,
    message: "Pendiente de implementar."
  });

}

/**
 * Eliminar especie
 */
export async function deleteSpecies(req, res) {

  res.status(501).json({
    success: false,
    message: "Pendiente de implementar."
  });

}

