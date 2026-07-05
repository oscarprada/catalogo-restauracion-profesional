import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import ProtectedAreaForm from "../components/ProtectedAreaForm";
import { createProtectedArea } from "../services/protectedAreasService";

function NewProtectedAreaPage() {
  const navigate = useNavigate();

  async function handleCreate(area) {
    try {
      await createProtectedArea(area);

      alert("Área protegida creada correctamente.");

      navigate("/admin/areas");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Layout title="Nueva Área Protegida">
      <ProtectedAreaForm
        initialData={null}
        onSubmit={handleCreate}
        submitLabel="Guardar Área Protegida"
      />
    </Layout>
  );
}

export default NewProtectedAreaPage;
