import { query } from "../config/db.js";
import { generateCatalog } from "../services/htmlGenerator.js";
import { generatePDF } from "../services/pdfGenerator.js";

export async function publishProtectedArea(req, res) {

    try {

        const { id } = req.params;

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

        for (const item of species) {

            // Imágenes
            const images = await query(
                `
                SELECT *
                FROM species_images
                WHERE species_id = $1
                ORDER BY is_cover DESC,
                         display_order ASC;
                `,
                [item.id]
            );

            item.images = images.rows;

            // Experiencias
            const experiences = await query(
                `
                SELECT *
                FROM species_experiences
                WHERE species_id = $1
                ORDER BY experience_year DESC NULLS LAST,
                         created_at DESC;
                `,
                [item.id]
            );

            item.experiences = experiences.rows;

            // Referencias
            const references = await query(
                `
                SELECT *
                FROM species_references
                WHERE species_id = $1
                ORDER BY publication_year DESC NULLS LAST,
                         created_at DESC;
                `,
                [item.id]
            );

            item.references = references.rows;

        }

        const publication = await generateCatalog(
    area,
    species
);

     const pdf = await generatePDF(
        publication.folder
    );

    res.json({
        success: true,
        area: area.name,
        species: species.length,
        folder: publication.folder,
        pdf: pdf.pdf
    });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}


