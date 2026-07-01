import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { getSpeciesByArea } from "../services/speciesService";

function SpeciesPage() {
  const { id } = useParams();

  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSpecies() {
      try {
        const data = await getSpeciesByArea(id);
        setSpecies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSpecies();
  }, [id]);

  return (
    <Layout title="Catálogo de Especies">

      {loading ? (
        <p>Cargando especies...</p>
      ) : (
        <div className="areas-grid">

          {species.length === 0 && (
            <p>No existen especies registradas para esta área protegida.</p>
          )}

          {species.map((item) => (
            <article key={item.id} className="area-card">

              <div className="area-content">

                <h3>{item.common_name}</h3>

                <p>
                  <strong>Nombre científico:</strong><br />
                  <em>{item.scientific_name}</em>
                </p>

                <p>
                  <strong>Familia:</strong> {item.family}
                </p>

                <p>
                  <strong>Categoría:</strong> {item.category}
                </p>

                <p>
                  <strong>Ecosistema:</strong> {item.ecosystem}
                </p>

                <p>
                  <strong>Método de propagación:</strong><br />
                  {item.propagation_method}
                </p>

                <p>{item.description}</p>

              </div>

            </article>
          ))}

        </div>
      )}

    </Layout>
  );
}

export default SpeciesPage;

