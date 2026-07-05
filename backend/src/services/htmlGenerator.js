import fs from "fs/promises";
import path from "path";

import { buildCatalogHTML } from "../templates/catalogTemplate.js";

export async function generateCatalog(area, species) {

    const publicationFolder = path.join(
        process.cwd(),
        "publications",
        `catalog-${area.id}`
    );

    const assetsImagesFolder = path.join(
        publicationFolder,
        "assets",
        "images"
    );

    const speciesImagesFolder = path.join(
        publicationFolder,
        "images"
    );

    await fs.mkdir(assetsImagesFolder, {
        recursive: true
    });

    await fs.mkdir(speciesImagesFolder, {
        recursive: true
    });

    // Logo institucional

    await fs.copyFile(
        path.join(
            process.cwd(),
            "assets",
            "images",
            "parques-logo.png"
        ),
        path.join(
            assetsImagesFolder,
            "parques-logo.png"
        )
    );

    // Copiar imágenes de especies

    for (const item of species) {

        if (!item.images) continue;

        for (const image of item.images) {

            const fileName = path.basename(image.image_url);

            const source = path.join(
                process.cwd(),
                image.image_url.replace(/^\//, "")
            );

            const destination = path.join(
                speciesImagesFolder,
                fileName
            );

            try {

                await fs.copyFile(
                    source,
                    destination
                );

                image.catalog_url =
                    `images/${fileName}`;

            } catch (error) {

                console.error(
                    "No fue posible copiar:",
                    source
                );

            }

        }

    }

    const html = buildCatalogHTML(
        area,
        species
    );

    await fs.writeFile(
        path.join(
            publicationFolder,
            "index.html"
        ),
        html,
        "utf8"
    );

    return {
        success: true,
        folder: publicationFolder
    };

}