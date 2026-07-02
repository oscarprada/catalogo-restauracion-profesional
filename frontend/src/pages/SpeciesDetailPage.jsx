import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import SpeciesGallery from "../components/SpeciesGallery";
import ImageUploader from "../components/ImageUploader";

function SpeciesDetailPage() {

  const { id } = useParams();

  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadSpecies() {

      try {

        const response = await fetch(
          `http://localhost:3000/api/species/${id}`
        );

        const data = await response.json();

        setSpecies(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadSpecies();

  }, [id]);

  if (loading) {
    return (
      <Layout title="Especie">
        <p>Cargando información...</p>
      </Layout>
    );
  }

  if (!species) {
    return (
      <Layout title="Especie">
        <p>No fue posible cargar la especie.</p>
      </Layout>
    );
  }

  return (

    <Layout title={species.common_name}>

      <Breadcrumb
        items={[
          { label: "Inicio", to: "/" },
          { label: "Áreas Protegidas", to: "/areas" },
          { label: "Especies", to: `/areas/${species.protected_area_id}` },
          { label: species.common_name }
        ]}
      />

      <div className="species-detail">

        <div className="species-header">

          <div className="species-photo">

            <img
              src="/assets/species-placeholder.jpg"
              alt={species.common_name}
            />

          </div>

          <div className="species-info">

            <h1>{species.common_name}</h1>

            <h2>
              <em>{species.scientific_name}</em>
            </h2>

            <hr />

            <p><strong>Familia:</strong> {species.family}</p>
            <p><strong>Categoría:</strong> {species.category}</p>
            <p><strong>Ecosistema:</strong> {species.ecosystem}</p>
            <p><strong>Estado:</strong> {species.conservation_status}</p>
            <p><strong>Propagación:</strong> {species.propagation_method}</p>

          </div>

        </div>

        <section>
          <h2>Descripción</h2>
          <p>{species.description || "Sin información."}</p>
        </section>

        <section>
          <h2>Hábitat</h2>
          <p>{species.habitat || "Sin información."}</p>
        </section>

        <section>
          <h2>Distribución</h2>
          <p>{species.distribution || "Sin información."}</p>
        </section>

        <section>
          <h2>Importancia ecológica</h2>
          <p>{species.ecological_importance || "Sin información."}</p>
        </section>

        <section>
          <h2>Uso en restauración</h2>
          <p>{species.restoration_use || "Sin información."}</p>
        </section>

        <section>
          <h2>Recomendaciones</h2>
          <p>{species.care_recommendations || "Sin información."}</p>
        </section>

        <section>
          <h2>Observaciones</h2>
          <p>{species.observations || "Sin información."}</p>
        </section>

        <SpeciesGallery speciesId={species.id} />

<ImageUploader
  speciesId={species.id}
  onUpload={() => window.location.reload()}
/>
      </div>

    </Layout>

  );

}

export default SpeciesDetailPage;


