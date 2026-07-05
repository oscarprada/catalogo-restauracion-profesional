import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import PrimaryButton from "../components/PrimaryButton";
import ProtectedAreaCard from "../components/ProtectedAreaCard";

import {
  getProtectedAreas
} from "../services/protectedAreasService";

function ProtectedAreasPage() {

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

    <Layout title="Áreas Protegidas">

      <Breadcrumb
        items={[
          { label: "Inicio", to: "/" },
          { label: "Áreas Protegidas" }
        ]}
      />

      <Link
        to="/"
        className="primary-button"
      >
        ← Inicio
      </Link>

      <br />
      <br />

      <Link
        to="/admin/areas"
      >

        <PrimaryButton>

          Administrar Áreas

        </PrimaryButton>

      </Link>

      <br />
      <br />

      {loading ? (

        <p>Cargando áreas protegidas...</p>

      ) : (

        <div className="areas-grid">

          {areas.map((area) => (

            <ProtectedAreaCard
              key={area.id}
              area={area}
            />

          ))}

        </div>

      )}

    </Layout>

  );

}

export default ProtectedAreasPage;


