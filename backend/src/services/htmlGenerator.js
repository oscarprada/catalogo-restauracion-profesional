import fs from "fs/promises";
import path from "path";

import { buildCatalogHTML } from "../templates/catalogTemplate.js";

export async function generateCatalog(area, species) {

    const publicationFolder = path.join(
        process.cwd(),
        "publications",
        `catalog-${area.id}`
    );

    await fs.mkdir(
        publicationFolder,
        {
            recursive: true
        }
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


