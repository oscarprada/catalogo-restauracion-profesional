import path from "path";
import puppeteer from "puppeteer";

export async function generatePDF(publicationFolder) {

  const browser = await puppeteer.launch({

    headless: true

  });

  try {

    const page = await browser.newPage();

    const htmlFile = `file://${path.join(
      publicationFolder,
      "index.html"
    )}`;

    await page.goto(htmlFile, {

      waitUntil: "networkidle0"

    });

    await page.pdf({

      path: path.join(
        publicationFolder,
        "catalog.pdf"
      ),

      format: "A4",

      printBackground: true,

      margin: {

        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm"

      }

    });

    return {

      success: true,

      pdf: path.join(
        publicationFolder,
        "catalog.pdf"
      )

    };

  } finally {

    await browser.close();

  }

}
