import { query } from "../config/db.js";

/**
 * Obtener todas las especies de un área protegida
 */
export async function getSpecies(req, res) {

  try {

    const { areaId } = req.params;

    const result = await query(
      `
      SELECT *
      FROM protected_area_species
      WHERE
        protected_area_id = $1
        AND is_active = TRUE
      ORDER BY common_name;
      `,
      [areaId]
    );

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
 * Obtener una especie
 */
export async function getSpeciesById(req, res) {

  try {

    const { id } = req.params;

    const result = await query(
      `
      SELECT *
      FROM protected_area_species
      WHERE id = $1;
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

  try {

    const { areaId } = req.params;

    const {
      common_name,
      scientific_name,
      family,
      category,
      ecosystem,
      conservation_status,
      propagation_method,
      description,
      habitat,
      distribution,
      flowering_period,
      fruiting_period,
      ecological_importance,
      restoration_use,
      care_recommendations,
      observations,
      latitude,
      longitude
    } = req.body;

    const result = await query(
      `
      INSERT INTO protected_area_species
      (
        protected_area_id,
        common_name,
        scientific_name,
        family,
        category,
        ecosystem,
        conservation_status,
        propagation_method,
        description,
        habitat,
        distribution,
        flowering_period,
        fruiting_period,
        ecological_importance,
        restoration_use,
        care_recommendations,
        observations,
        latitude,
        longitude
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17,$18,$19
      )
      RETURNING *;
      `,
      [
        areaId,
        common_name,
        scientific_name,
        family,
        category,
        ecosystem,
        conservation_status,
        propagation_method,
        description,
        habitat,
        distribution,
        flowering_period,
        fruiting_period,
        ecological_importance,
        restoration_use,
        care_recommendations,
        observations,
        latitude || null,
        longitude || null
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}

/**
 * Actualizar especie
 */
export async function updateSpecies(req, res) {

  res.status(501).json({
    success: false,
    message: "Pendiente."
  });

}

/**
 * Eliminar especie
 */
export async function deleteSpecies(req, res) {

  res.status(501).json({
    success: false,
    message: "Pendiente."
  });

}
