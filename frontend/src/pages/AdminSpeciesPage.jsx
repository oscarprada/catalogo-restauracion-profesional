import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";

import {
  getSpeciesByArea
} from "../services/speciesService";

function AdminSpeciesPage() {

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

    <Layout title="Administración de Especies">

      <Link
        to="/admin/areas"
        className="primary-button"
      >
        ← Volver a Áreas
      </Link>

      <br />
      <br />

      <Link
        to={`/admin/areas/${id}/species/new`}
      >

        <PrimaryButton>

          + Nueva Especie

        </PrimaryButton>

      </Link>

      <hr />

      {loading ? (

        <p>Cargando especies...</p>

      ) : species.length === 0 ? (

        <p>No existen especies registradas para esta área protegida.</p>

      ) : (

        <ul>

          {species.map(item => (

            <li key={item.id}>

              <strong>{item.common_name}</strong>

              <br />

              <em>{item.scientific_name}</em>

            </li>

          ))}

        </ul>

      )}

    </Layout>

  );

}

export default AdminSpeciesPage;

