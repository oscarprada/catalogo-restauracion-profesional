import fs from "fs/promises";
import path from "path";

import { buildCatalogHTML } from "../templates/catalogTemplate.js";

export async function generateCatalog(area, species) {

    const publicationFolder = path.join(
        process.cwd(),
        "publications",
        `catalog-${area.id}`
    );

    const assetsFolder = path.join(
        publicationFolder,
        "assets",
        "images"
    );

    await fs.mkdir(assetsFolder, {
        recursive: true
    });

    await fs.copyFile(
        path.join(
            process.cwd(),
            "assets",
            "images",
            "parques-logo.png"
        ),
        path.join(
            assetsFolder,
            "parques-logo.png"
        )
    );

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
