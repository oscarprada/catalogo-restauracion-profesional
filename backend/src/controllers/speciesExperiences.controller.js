import { query } from "../config/db.js";

export async function getSpeciesExperiences(req, res) {
  try {
    const { id } = req.params;

    const result = await query(
      `
      SELECT *
      FROM species_experiences
      WHERE species_id = $1
      ORDER BY experience_year DESC, created_at DESC;
      `,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function createSpeciesExperience(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      experience_year,
      location,
      nursery_name,
      responsible_person,
      objective,
      methodology,
      results,
      lessons_learned,
      observations
    } = req.body;

    const result = await query(
      `
      INSERT INTO species_experiences
      (
        species_id,
        title,
        experience_year,
        location,
        nursery_name,
        responsible_person,
        objective,
        methodology,
        results,
        lessons_learned,
        observations
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
      `,
      [
        id,
        title,
        experience_year,
        location,
        nursery_name,
        responsible_person,
        objective,
        methodology,
        results,
        lessons_learned,
        observations
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
