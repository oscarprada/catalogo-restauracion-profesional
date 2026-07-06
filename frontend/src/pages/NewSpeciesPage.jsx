import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import SpeciesForm from "../components/SpeciesForm";

import {
  createSpecies
} from "../services/speciesService";

function NewSpeciesPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  async function handleCreate(form) {

    try {

      await createSpecies(id, form);

      alert("Especie creada correctamente.");

      navigate(`/admin/areas/${id}/species`);

    } catch (error) {

      alert(error.message);

    }

  }

  return (

    <Layout title="Nueva Especie">

      <SpeciesForm
        areaId={id}
        initialData={null}
        onSubmit={handleCreate}
        submitLabel="Guardar Especie"
      />

    </Layout>

  );

}

export default NewSpeciesPage;
