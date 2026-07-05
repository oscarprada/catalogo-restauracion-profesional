import { Link } from "react-router-dom";
import { useState } from "react";

import Card from "./Card";
import FormRow from "./FormRow";
import FormGroup from "./FormGroup";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";

function ProtectedAreaForm({

  initialData,
  onSubmit,
  submitLabel

}) {

  const [form, setForm] = useState({

    code: initialData?.code ?? "",

    name: initialData?.name ?? "",

    category: initialData?.category ?? "",

    region: initialData?.region ?? "",

    department: initialData?.department ?? "",

    municipality: initialData?.municipality ?? "",

    description: initialData?.description ?? ""

  });

  async function handleSubmit() {

    if (onSubmit) {

      await onSubmit(form);

    }

  }

  return (

    <Card>

      <Link
        to="/admin/areas"
        className="primary-button"
      >
        ← Volver
      </Link>

      <br />
      <br />

      <FormRow>

        <FormGroup label="Código">

          <TextInput
            value={form.code}
            onChange={(e)=>
              setForm({
                ...form,
                code:e.target.value
              })
            }
          />

        </FormGroup>

        <FormGroup label="Nombre">

          <TextInput
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
          />

        </FormGroup>

      </FormRow>

      <FormRow>

        <FormGroup label="Categoría">

          <TextInput
            value={form.category}
            onChange={(e)=>
              setForm({
                ...form,
                category:e.target.value
              })
            }
          />

        </FormGroup>

        <FormGroup label="Región">

          <TextInput
            value={form.region}
            onChange={(e)=>
              setForm({
                ...form,
                region:e.target.value
              })
            }
          />

        </FormGroup>

      </FormRow>

      <FormRow>

        <FormGroup label="Departamento">

          <TextInput
            value={form.department}
            onChange={(e)=>
              setForm({
                ...form,
                department:e.target.value
              })
            }
          />

        </FormGroup>

        <FormGroup label="Municipio">

          <TextInput
            value={form.municipality}
            onChange={(e)=>
              setForm({
                ...form,
                municipality:e.target.value
              })
            }
          />

        </FormGroup>

      </FormRow>

      <FormGroup label="Descripción">

        <TextArea
          value={form.description}
          onChange={(e)=>
            setForm({
              ...form,
              description:e.target.value
            })
          }
        />

      </FormGroup>

      <br />

      <PrimaryButton
        onClick={handleSubmit}
      >

        {submitLabel}

      </PrimaryButton>

    </Card>

  );

}

export default ProtectedAreaForm;


