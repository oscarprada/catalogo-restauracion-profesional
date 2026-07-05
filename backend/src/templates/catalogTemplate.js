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

    background:white;

    border-radius:12px;

    padding:40px;

    margin-bottom:40px;

    box-shadow:0 2px 10px rgba(0,0,0,.08);

    text-align:center;

}

.logo{

    width:130px;

    margin-bottom:20px;

}

h1{

    color:#2cab87;

    margin-bottom:5px;

}

h2{

    color:#71b956;

    margin-top:0;

}

.area-name{

    font-size:28px;

    margin-top:30px;

    color:#222;

}

.description{

    margin-top:20px;

    color:#555;

    line-height:1.7;

}

section{

    margin-top:50px;

}

.section-title{

    color:#2cab87;

    border-bottom:3px solid #2cab87;

    padding-bottom:10px;

    margin-bottom:25px;

}

.species-card{

    background:white;

    border-radius:12px;

    padding:25px;

    margin-bottom:25px;

    box-shadow:0 2px 8px rgba(0,0,0,.08);

}

</style>

</head>

<body>

<div class="container">

<header>

<img
    src="assets/images/parques-logo.png"
    class="logo"
    alt="Parques Nacionales Naturales de Colombia"
/>

<h1>Parques Nacionales Naturales de Colombia</h1>

<h2>Catálogo de Restauración Ecológica</h2>

<div class="area-name">

${area.name}

</div>

<div class="description">

${area.description ?? ""}

</div>

</header>

<section>

<h2 class="section-title">

Especies del Área Protegida

</h2>

${speciesHTML}

</section>

</div>

</body>

</html>

`;

}

