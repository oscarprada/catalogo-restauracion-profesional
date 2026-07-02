import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProtectedAreaCard from "../components/ProtectedAreaCard";
import Breadcrumb from "../components/Breadcrumb";
import { getProtectedAreas } from "../services/protectedAreasService";

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

