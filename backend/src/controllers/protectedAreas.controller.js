import { query } from "../config/db.js";

export async function getProtectedAreas(req, res) {

  try {

    const sql = `
      SELECT *
      FROM protected_areas
      ORDER BY name;
    `;

    const result = await query(sql);

    res.json(result.rows);

  } catch (error) {

    console.error("ERROR getProtectedAreas:", error);

    res.status(500).json({
      success: false,
      error: error.message,
      detail: error.detail ?? null,
      code: error.code ?? null
    });

  }

}

export async function getProtectedAreaById(req, res) {

  try {

    const { id } = req.params;

    const result = await query(
      `
      SELECT *
      FROM protected_areas
      WHERE id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Área protegida no encontrada."
      });

    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error("ERROR getProtectedAreaById:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}

export async function createProtectedArea(req, res) {

  try {

    const {
      code,
      name,
      category,
      region,
      department,
      municipality,
      description
    } = req.body;

    const result = await query(
      `
      INSERT INTO protected_areas
      (
        code,
        name,
        category,
        region,
        department,
        municipality,
        description
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7
      )
      RETURNING *;
      `,
      [
        code,
        name,
        category,
        region,
        department,
        municipality,
        description
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error("ERROR createProtectedArea:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}

export async function updateProtectedArea(req, res) {

  try {

    const { id } = req.params;

    const {
      code,
      name,
      category,
      region,
      department,
      municipality,
      description
    } = req.body;

    const result = await query(
      `
      UPDATE protected_areas
      SET
        code = $1,
        name = $2,
        category = $3,
        region = $4,
        department = $5,
        municipality = $6,
        description = $7
      WHERE id = $8
      RETURNING *;
      `,
      [
        code,
        name,
        category,
        region,
        department,
        municipality,
        description,
        id
      ]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Área protegida no encontrada."
      });

    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error("ERROR updateProtectedArea:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}

export async function deleteProtectedArea(req, res) {

  try {

    const { id } = req.params;

    const result = await query(
      `
      DELETE
      FROM protected_areas
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Área protegida no encontrada."
      });

    }

    res.json({
      success: true,
      message: "Área protegida eliminada."
    });

  } catch (error) {

    console.error("ERROR deleteProtectedArea:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}

