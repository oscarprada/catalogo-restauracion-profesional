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
      `SELECT * FROM protected_areas WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Área protegida no encontrada"
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
        department,
        municipality,
        description
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *;
      `,
      [
        code,
        name,
        category,
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
      department,
      municipality,
      description
    } = req.body;

    const result = await query(
      `
      UPDATE protected_areas
      SET
        code=$1,
        name=$2,
        category=$3,
        department=$4,
        municipality=$5,
        description=$6
      WHERE id=$7
      RETURNING *;
      `,
      [
        code,
        name,
        category,
        department,
        municipality,
        description,
        id
      ]
    );

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

    await query(
      `DELETE FROM protected_areas WHERE id=$1`,
      [id]
    );

    res.json({
      success: true,
      message: "Área protegida eliminada"
    });

  } catch (error) {

    console.error("ERROR deleteProtectedArea:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
