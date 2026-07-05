import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import ProtectedAreaForm from "../components/ProtectedAreaForm";

import {
  getProtectedAreaById,
  updateProtectedArea
} from "../services/protectedAreasService";

function EditProtectedAreaPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadArea() {

      try {

        const data = await getProtectedAreaById(id);

        setArea(data);

      } catch (error) {

        alert(error.message);

      } finally {

        setLoading(false);

      }

    }

    loadArea();

  }, [id]);

  async function handleUpdate(form) {

    try {

      await updateProtectedArea(id, form);

      alert("Área protegida actualizada correctamente.");

      navigate("/admin/areas");

    } catch (error) {

      alert(error.message);

    }

  }

  if (loading) {

    return (

      <Layout title="Editar Área Protegida">

        <p>Cargando información...</p>

      </Layout>

    );

  }

  return (

    <Layout title="Editar Área Protegida">

      <ProtectedAreaForm
        initialData={area}
        onSubmit={handleUpdate}
        submitLabel="Actualizar Área Protegida"
      />

    </Layout>

  );

}

export default EditProtectedAreaPage;

