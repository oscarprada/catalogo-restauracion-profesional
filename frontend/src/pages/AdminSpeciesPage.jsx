import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";
import AdminSpeciesCard from "../components/AdminSpeciesCard";

import {
  getSpeciesByArea,
  deleteSpecies
} from "../services/speciesService";

function AdminSpeciesPage() {

  const { id } = useParams();

  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {

    loadSpecies();

  }, [id]);

  async function handleDelete(species) {

    const confirmDelete = window.confirm(
      `¿Está seguro de eliminar la especie "${species.common_name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteSpecies(species.id);

      alert("Especie eliminada correctamente.");

      loadSpecies();

    } catch (error) {

      alert(error.message);

    }

  }

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

        <div className="areas-grid">

          {species.map(item => (

            <AdminSpeciesCard
              key={item.id}
              species={item}
              areaId={id}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </Layout>

  );

}

export default AdminSpeciesPage;

