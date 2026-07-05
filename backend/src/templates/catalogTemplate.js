export function buildCatalogHTML(area, species) {

    const speciesHTML = species.length === 0

        ? `
            <p>No existen especies registradas para esta área protegida.</p>
          `

        : species.map((item) => `
            <article class="species-card">

                <h3>${item.common_name}</h3>

                <p>
                    <strong>Nombre científico:</strong>
                    <em>${item.scientific_name ?? ""}</em>
                </p>

                <p>
                    <strong>Familia:</strong>
                    ${item.family ?? ""}
                </p>

                <p>
                    <strong>Descripción:</strong><br>
                    ${item.description ?? ""}
                </p>

            </article>
        `).join("");

    return `
<!DOCTYPE html>

<html lang="es">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>${area.name}</title>

<style>

*{

    box-sizing:border-box;

}

body{

    margin:0;

    padding:40px;

    background:#f5f7f4;

    font-family:Arial,Helvetica,sans-serif;

    color:#222;

}

.container{

    max-width:1200px;

    margin:auto;

}

header{

    text-align:center;

    padding:40px;

    background:white;

    border-radius:10px;

    margin-bottom:40px;

    box-shadow:0 2px 8px rgba(0,0,0,.08);

}

h1{

    color:#2cab87;

    margin-bottom:10px;

}

h2{

    color:#2cab87;

    border-bottom:2px solid #2cab87;

    padding-bottom:8px;

}

.species-card{

    background:white;

    border-radius:10px;

    padding:20px;

    margin-top:20px;

    box-shadow:0 2px 8px rgba(0,0,0,.08);

}

</style>

</head>

<body>

<div class="container">

<header>

<h1>Parques Nacionales Naturales de Colombia</h1>

<h2>Catálogo de Restauración Ecológica</h2>

<h3>${area.name}</h3>

<p>${area.description ?? ""}</p>

</header>

<section>

<h2>Especies del área protegida</h2>

${speciesHTML}

</section>

</div>

</body>

</html>

`;

}
