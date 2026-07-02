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

export async function deleteSpeciesImage(req, res) {

  try {

    const { imageId } = req.params;

    const result = await query(
      `
      DELETE FROM species_images
      WHERE id = $1
      RETURNING *;
      `,
      [imageId]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Imagen no encontrada."
      });

    }

    res.json({
      success: true,
      message: "Imagen eliminada."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}