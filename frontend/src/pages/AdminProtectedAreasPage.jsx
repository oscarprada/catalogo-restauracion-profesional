import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";
import AdminProtectedAreaCard from "../components/AdminProtectedAreaCard";
import NewProtectedAreaPage from "../pages/NewProtectedAreaPage";

import {
  getProtectedAreas
} from "../services/protectedAreasService";

function AdminProtectedAreasPage() {

  const [areas, setAreas] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

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

    loadAreas();

  }, []);

  return (

    <Layout title="Administración de Áreas Protegidas">

    <Link to="/admin/areas/new">

  <PrimaryButton>

    Nueva Área Protegida

  </PrimaryButton>

</Link>

<br />
<br />

      {loading ? (

        <p>Cargando áreas protegidas...</p>

      ) : (

        <div className="areas-grid">

          {areas.map((area) => (

            <AdminProtectedAreaCard
              key={area.id}
              area={area}
            />

          ))}

        </div>

      )}

    </Layout>

  );

}

export default AdminProtectedAreasPage;