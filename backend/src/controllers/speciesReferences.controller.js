import { query } from "../config/db.js";

export async function getSpeciesReferences(req, res) {

  try {

    const { id } = req.params;

    const result = await query(
      `
      SELECT *
      FROM species_references
      WHERE species_id = $1
      ORDER BY publication_year DESC NULLS LAST,
               created_at DESC;
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

export async function createSpeciesReference(req, res) {

  try {

    const { id } = req.params;

    const {
      title,
      authors,
      publication_year,
      source,
      url,
      notes
    } = req.body;

    const result = await query(
      `
      INSERT INTO species_references
      (
        species_id,
        title,
        authors,
        publication_year,
        source,
        url,
        notes
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
      `,
      [
        id,
        title,
        authors,
        publication_year,
        source,
        url,
        notes
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

}
