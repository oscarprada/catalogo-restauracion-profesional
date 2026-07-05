export function buildCatalogHTML(area, species) {

    const speciesHTML = species.length === 0

        ? `<p>No existen especies registradas para esta área protegida.</p>`

        : species.map((item) => {

            const coverImage =
                item.images && item.images.length > 0
                    ? item.images[0].catalog_url
                    : null;

            return `

<section class="species-card">

${coverImage ? `

<img
    src="${coverImage}"
    class="species-image"
    alt="${item.common_name}"
>

` : ""}

<h2>${item.common_name}</h2>

<p><strong>Nombre científico:</strong> <em>${item.scientific_name}</em></p>

<p><strong>Familia:</strong> ${item.family ?? ""}</p>

<p><strong>Categoría:</strong> ${item.category ?? ""}</p>

<p><strong>Ecosistema:</strong> ${item.ecosystem ?? ""}</p>

<p><strong>Estado de conservación:</strong> ${item.conservation_status ?? ""}</p>

<p><strong>Método de propagación:</strong> ${item.propagation_method ?? ""}</p>

<h3>Descripción</h3>
<p>${item.description ?? ""}</p>

<h3>Hábitat</h3>
<p>${item.habitat ?? ""}</p>

<h3>Distribución</h3>
<p>${item.distribution ?? ""}</p>

<h3>Floración</h3>
<p>${item.flowering_period ?? ""}</p>

<h3>Fructificación</h3>
<p>${item.fruiting_period ?? ""}</p>

<h3>Importancia ecológica</h3>
<p>${item.ecological_importance ?? ""}</p>

<h3>Uso en restauración</h3>
<p>${item.restoration_use ?? ""}</p>

<h3>Recomendaciones</h3>
<p>${item.care_recommendations ?? ""}</p>

<h3>Observaciones</h3>
<p>${item.observations ?? ""}</p>

</section>

`;

        }).join("");

    return `
<!DOCTYPE html>

<html lang="es">

<head>

<meta charset="UTF-8">

<title>${area.name}</title>

<style>

body{

font-family:Arial,Helvetica,sans-serif;
background:#f5f7f4;
margin:0;
padding:40px;
color:#222;

}

.container{

max-width:1200px;
margin:auto;

}

header{

background:white;
padding:40px;
border-radius:12px;
text-align:center;
margin-bottom:40px;

}

.logo{

width:120px;

}

.species-card{

background:white;
padding:30px;
margin-top:30px;
border-radius:12px;
box-shadow:0 2px 8px rgba(0,0,0,.08);

}

.species-image{

width:100%;
max-width:500px;
display:block;
margin:0 auto 25px;
border-radius:12px;

}

h1{

color:#2cab87;

}

h2{

color:#2cab87;

}

h3{

margin-top:25px;
color:#71b956;

}

</style>

</head>

<body>

<div class="container">

<header>

<img
src="assets/images/parques-logo.png"
class="logo"
>

<h1>Parques Nacionales Naturales de Colombia</h1>

<h2>Catálogo de Restauración Ecológica</h2>

<h2>${area.name}</h2>

<p>${area.description ?? ""}</p>

</header>

${speciesHTML}

</div>

</body>

</html>

`;

}



