export function buildCatalogHTML(area, species) {

    const speciesHTML = species.length === 0

        ? `<p>No existen especies registradas para esta área protegida.</p>`

        : species.map((item) => {

            const coverImage =
                item.images && item.images.length > 0
                    ? item.images[0].catalog_url
                    : null;

            const experiencesHTML =
                item.experiences && item.experiences.length > 0

                ? item.experiences.map(exp => `

    

<div class="experience">

<h4>${exp.title}</h4>

<p><strong>Año:</strong> ${exp.experience_year ?? ""}</p>

<p><strong>Ubicación:</strong> ${exp.location ?? ""}</p>

<p><strong>Vivero:</strong> ${exp.nursery_name ?? ""}</p>

<p><strong>Responsable:</strong> ${exp.responsible_person ?? ""}</p>

<p><strong>Objetivo:</strong></p>

<p>${exp.objective ?? ""}</p>

<p><strong>Metodología:</strong></p>

<p>${exp.methodology ?? ""}</p>

<p><strong>Resultados:</strong></p>

<p>${exp.results ?? ""}</p>

<p><strong>Lecciones aprendidas:</strong></p>

<p>${exp.lessons_learned ?? ""}</p>

<p><strong>Observaciones:</strong></p>

<p>${exp.observations ?? ""}</p>

</div>

`).join("")

                : "<p>No existen experiencias registradas.</p>";

const referencesHTML =
    item.references && item.references.length > 0

        ? item.references.map(ref => `

<div class="reference">

<p><strong>${ref.title}</strong></p>

<p><strong>Autores:</strong> ${ref.authors ?? ""}</p>

<p><strong>Año:</strong> ${ref.publication_year ?? ""}</p>

<p><strong>Fuente:</strong> ${ref.source ?? ""}</p>

<p><strong>URL:</strong> ${ref.url ?? ""}</p>

<p>${ref.notes ?? ""}</p>

</div>

`).join("")

        : "<p>No existen referencias bibliográficas.</p>";

            return `

<section
    id="species-${item.id}"
    class="species-card"
>

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

<h3>Experiencias de propagación</h3>

${experiencesHTML}

<h3>Referencias bibliográficas</h3>

${referencesHTML}

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

.experience{
margin-top:20px;
padding:20px;
background:#f7f7f7;
border-left:5px solid #2cab87;
border-radius:8px;
}

.reference{

margin-top:20px;

padding:20px;

background:#f8f8f8;

border-left:5px solid #71b956;

border-radius:8px;

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

<p><strong>Código:</strong> ${area.code ?? ""}</p>

<p><strong>Categoría:</strong> ${area.category ?? ""}</p>

<p><strong>Región:</strong> ${area.region ?? ""}</p>

<p><strong>Departamento:</strong> ${area.department ?? ""}</p>

<p><strong>Municipio(s):</strong> ${area.municipality ?? ""}</p>

<p>${area.description ?? ""}</p>

<p>

<strong>Número de especies registradas:</strong>

${species.length}

</p>

<p>

<strong>Fecha de generación:</strong>

${new Date().toLocaleDateString("es-CO")}

</p>

</header>

<h2>Índice de especies</h2>

<ul class="index-list">

${species.map((item) => `

<li>

<a href="#species-${item.id}">

${item.common_name}

</a>

</li>

`).join("")}

</ul>


${speciesHTML}

</div>

</body>

</html>
`;

}




