import { useEffect, useState } from "react";
import {
  getSpeciesExperiences,
  createSpeciesExperience
} from "../services/speciesExperiencesService";

function SpeciesExperiences({ speciesId }) {

  const [experiences, setExperiences] = useState([]);

  const [form, setForm] = useState({
    title: "",
    experience_year: "",
    location: "",
    nursery_name: "",
    responsible_person: "",
    objective: "",
    methodology: "",
    results: "",
    lessons_learned: "",
    observations: ""
  });

  async function loadExperiences() {

    try {

      const data = await getSpeciesExperiences(speciesId);

      setExperiences(data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {
    loadExperiences();
  }, [speciesId]);

  async function saveExperience() {

    try {

      await createSpeciesExperience(
        speciesId,
        form
      );

      setForm({
        title: "",
        experience_year: "",
        location: "",
        nursery_name: "",
        responsible_person: "",
        objective: "",
        methodology: "",
        results: "",
        lessons_learned: "",
        observations: ""
      });

      await loadExperiences();

    } catch (error) {

      alert(error.message);

    }

  }

  return (

    <section>

      <h2>Experiencias de propagación</h2>

      <input
        placeholder="Título"
        value={form.title}
        onChange={(e)=>
          setForm({
            ...form,
            title:e.target.value
          })
        }
      />

      <input
        placeholder="Año"
        value={form.experience_year}
        onChange={(e)=>
          setForm({
            ...form,
            experience_year:e.target.value
          })
        }
      />

      <input
        placeholder="Ubicación"
        value={form.location}
        onChange={(e)=>
          setForm({
            ...form,
            location:e.target.value
          })
        }
      />

      <textarea
        placeholder="Objetivo"
        value={form.objective}
        onChange={(e)=>
          setForm({
            ...form,
            objective:e.target.value
          })
        }
      />

      <button onClick={saveExperience}>
        Guardar experiencia
      </button>

      <hr />

      {experiences.length===0 && (
        <p>No existen experiencias registradas.</p>
      )}

      {experiences.map((item)=>(

        <article key={item.id}>

          <h3>{item.title}</h3>

          <p>
            <strong>Año:</strong> {item.experience_year}
          </p>

          <p>
            <strong>Ubicación:</strong> {item.location}
          </p>

          <p>{item.objective}</p>

        </article>

      ))}

    </section>

  );

}

export default SpeciesExperiences;

