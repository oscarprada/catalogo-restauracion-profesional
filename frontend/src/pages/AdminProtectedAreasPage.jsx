import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";
import AdminProtectedAreaCard from "../components/AdminProtectedAreaCard";

import {
  getProtectedAreas,
  deleteProtectedArea
} from "../services/protectedAreasService";

function AdminProtectedAreasPage() {

  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAreas() {

    try {

      const data = await getProtectedAreas();

      setAreas(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadAreas();

  }, []);

  async function handleDelete(area) {

    const confirmDelete = window.confirm(
      `¿Está seguro de eliminar el área protegida "${area.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteProtectedArea(area.id);

      alert("Área protegida eliminada correctamente.");

      loadAreas();

    } catch (error) {

      alert(error.message);

    }

  }

  return (

    <Layout title="Administración de Áreas Protegidas">

      <Link
        to="/areas"
        className="primary-button"
      >
        ← Volver a Áreas Protegidas
      </Link>

      <br />
      <br />

      <p>
        Desde este módulo podrá administrar las áreas protegidas utilizadas para la generación de los catálogos de restauración.
      </p>

      <br />

      <Link to="/admin/areas/new">

        <PrimaryButton>

          + Nueva Área Protegida

        </PrimaryButton>

      </Link>

      <hr />

      {loading ? (

        <p>Cargando áreas protegidas...</p>

      ) : (

        <div className="areas-grid">

          {areas.map((area) => (

            <AdminProtectedAreaCard
              key={area.id}
              area={area}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </Layout>

  );

}

export default AdminProtectedAreasPage;
