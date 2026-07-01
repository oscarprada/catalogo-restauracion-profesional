import { query } from "../config/db.js";

export async function getSpeciesByProtectedArea(req, res) {
  try {
    const { id } = req.params;

    const result = await query(
      `
      SELECT *
      FROM protected_area_species
      WHERE protected_area_id = $1
        AND is_active = TRUE
      ORDER BY common_name;
      `,
      [id]
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

export async function createSpecies(req, res) {
  try {

    const { id } = req.params;

    const {
      common_name,
      scientific_name,
      family,
      category,
      ecosystem,
      conservation_status,
      propagation_method,
      description
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
        description
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
      `,
      [
        id,
        common_name,
        scientific_name,
        family,
        category,
        ecosystem,
        conservation_status,
        propagation_method,
        description
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


