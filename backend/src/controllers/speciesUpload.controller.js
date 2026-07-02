import { query } from "../config/db.js";

export async function uploadSpeciesImage(req, res) {

  try {

    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se recibió ninguna imagen."
      });
    }

    const imageUrl = `/uploads/species/${req.file.filename}`;

    const result = await query(
      `
      INSERT INTO species_images
      (
        species_id,
        image_url,
        caption,
        author,
        is_cover,
        display_order
      )
      VALUES
      ($1,$2,'','',false,1)
      RETURNING *;
      `,
      [id, imageUrl]
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

