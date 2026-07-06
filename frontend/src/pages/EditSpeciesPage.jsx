import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import SpeciesForm from "../components/SpeciesForm";

import {
  getSpeciesById,
  updateSpecies
} from "../services/speciesService";

function EditSpeciesPage() {

  const { id, speciesId } = useParams();

  const navigate = useNavigate();

  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadSpecies() {

      try {

        const data = await getSpeciesById(speciesId);

        setSpecies(data);

      } catch (error) {

        alert(error.message);

      } finally {

        setLoading(false);

      }

    }

    loadSpecies();

  }, [speciesId]);

  async function handleUpdate(form) {

    try {

      await updateSpecies(speciesId, form);

      alert("Especie actualizada correctamente.");

      navigate(`/admin/areas/${id}/species`);

    } catch (error) {

      alert(error.message);

    }

  }

  if (loading) {

    return (

      <Layout title="Editar Especie">

        <p>Cargando información...</p>

      </Layout>

    );

  }

  return (

    <Layout title="Editar Especie">

      <SpeciesForm
        areaId={id}
        initialData={species}
        onSubmit={handleUpdate}
        submitLabel="Actualizar Especie"
      />

    </Layout>

  );

}

export default EditSpeciesPage;