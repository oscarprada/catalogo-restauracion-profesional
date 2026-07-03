import { useEffect, useState } from "react";
import {
  getSpeciesExperiences,
  createSpeciesExperience
} from "../services/speciesExperiencesService";
import Card from "./Card";
import Section from "./Section";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

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

  <Section title="Experiencias de propagación">

    <Card>

      <h3>Nueva experiencia</h3>

      <TextInput
        placeholder="Título"
        value={form.title}
        onChange={(e)=>
          setForm({
            ...form,
            title:e.target.value
          })
        }
      />

      <br /><br />

      <TextInput
        placeholder="Año"
        value={form.experience_year}
        onChange={(e)=>
          setForm({
            ...form,
            experience_year:e.target.value
          })
        }
      />

      <br /><br />

      <TextInput
        placeholder="Ubicación"
        value={form.location}
        onChange={(e)=>
          setForm({
            ...form,
            location:e.target.value
          })
        }
      />

      <br /><br />
<TextInput
  placeholder="Vivero"
  value={form.nursery_name}
  onChange={(e)=>
    setForm({
      ...form,
      nursery_name:e.target.value
    })
  }
/>

<br /><br />

<TextInput
  placeholder="Responsable"
  value={form.responsible_person}
  onChange={(e)=>
    setForm({
      ...form,
      responsible_person:e.target.value
    })
  }
/>

<br /><br />
      <TextArea
        placeholder="Objetivo"
        value={form.objective}
        onChange={(e)=>
          setForm({
            ...form,
            objective:e.target.value
          })
        }
      />
      <br /><br />

<TextArea
  placeholder="Metodología"
  value={form.methodology}
  onChange={(e)=>
    setForm({
      ...form,
      methodology:e.target.value
    })
  }
/>
      <br /><br />

    <br /><br />

<TextArea
  placeholder="Resultados"
  value={form.results}
  onChange={(e)=>
    setForm({
      ...form,
      results:e.target.value
    })
  }
/>

<br /><br />

<TextArea
  placeholder="Lecciones aprendidas"
  value={form.lessons_learned}
  onChange={(e)=>
    setForm({
      ...form,
      lessons_learned:e.target.value
    })
  }
/>
<br /><br />

<TextArea
  placeholder="Observaciones"
  value={form.observations}
  onChange={(e)=>
    setForm({
      ...form,
      observations:e.target.value
    })
  }
/>
      <PrimaryButton onClick={saveExperience}>
        Guardar experiencia
      </PrimaryButton>

    </Card>

    <br />

    {experiences.length===0 && (

      <Card>

        <p>No existen experiencias registradas.</p>

      </Card>

    )}

    {experiences.map((item)=>(

      <Card key={item.id}>

        <h3>{item.title}</h3>

        <p>

          <strong>Año:</strong> {item.experience_year}

        </p>

        <p>

          <strong>Ubicación:</strong> {item.location}

        </p>

        <p>{item.objective}</p>

      </Card>

    ))}

  </Section>

);

  

}

export default SpeciesExperiences;

