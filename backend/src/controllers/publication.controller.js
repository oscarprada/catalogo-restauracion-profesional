import { query } from "../config/db.js";
import { generateCatalog } from "../services/htmlGenerator.js";

export async function publishProtectedArea(req, res) {

    try {

        const { id } = req.params;

        // ==========================
        // Área protegida
        // ==========================

        const areaResult = await query(
            `
            SELECT *
            FROM protected_areas
            WHERE id = $1;
            `,
            [id]
        );

        if (areaResult.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Área protegida no encontrada."
            });

        }

        const area = areaResult.rows[0];

        // ==========================
        // Especies del área
        // ==========================

        const speciesResult = await query(
            `
            SELECT *
            FROM protected_area_species
            WHERE protected_area_id = $1
            ORDER BY common_name;
            `,
            [id]
        );

        const species = speciesResult.rows;

        // ==========================
        // Generar catálogo
        // ==========================

        const publication = await generateCatalog(
            area,
            species
        );

        res.json({
            success: true,
            area: area.name,
            species: species.length,
            folder: publication.folder
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
