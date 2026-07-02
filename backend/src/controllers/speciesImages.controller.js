import { query } from "../config/db.js";

export async function getSpeciesImages(req, res) {

  try {

    const { id } = req.params;

    const result = await query(
      `
      SELECT *
      FROM species_images
      WHERE species_id = $1
      ORDER BY display_order ASC;
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
