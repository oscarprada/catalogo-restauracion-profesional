import { Link } from "react-router-dom";
import { useState } from "react";

import Card from "./Card";
import FormRow from "./FormRow";
import FormGroup from "./FormGroup";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";

function SpeciesForm({
  areaId,
  initialData,
  onSubmit,
  submitLabel
}) {
  const [form, setForm] = useState({
    common_name: initialData?.common_name ?? "",
    scientific_name: initialData?.scientific_name ?? "",
    family: initialData?.family ?? "",
    category: initialData?.category ?? "",
    ecosystem: initialData?.ecosystem ?? "",
    conservation_status: initialData?.conservation_status ?? "",
    propagation_method: initialData?.propagation_method ?? "",
    description: initialData?.description ?? "",
    habitat: initialData?.habitat ?? "",
    distribution: initialData?.distribution ?? "",
    flowering_period: initialData?.flowering_period ?? "",
    fruiting_period: initialData?.fruiting_period ?? "",
    ecological_importance: initialData?.ecological_importance ?? "",
    restoration_use: initialData?.restoration_use ?? "",
    care_recommendations: initialData?.care_recommendations ?? "",
    observations: initialData?.observations ?? "",
    latitude: initialData?.latitude ?? "",
    longitude: initialData?.longitude ?? ""
  });

  function updateField(field, value) {
    setForm({
      ...form,
      [field]: value
    });
  }

  async function handleSubmit() {
    if (!form.common_name.trim()) {
      alert("El nombre común es obligatorio.");
      return;
    }

    if (!form.scientific_name.trim()) {
      alert("El nombre científico es obligatorio.");
      return;
    }

    if (onSubmit) {
      await onSubmit(form);
    }
  }

  return (
    <Card>

      <Link
        to={`/admin/areas/${areaId}/species`}
        className="primary-button"
      >
        ← Volver a Especies
      </Link>

      <br />
      <br />

      <FormRow>

        <FormGroup label="Nombre común">

          <TextInput
            value={form.common_name}
            onChange={(e) => updateField("common_name", e.target.value)}
          />

        </FormGroup>

        <FormGroup label="Nombre científico">

          <TextInput
            value={form.scientific_name}
            onChange={(e) => updateField("scientific_name", e.target.value)}
          />

        </FormGroup>

      </FormRow>

      <FormRow>

        <FormGroup label="Familia">

          <TextInput
            value={form.family}
            onChange={(e) => updateField("family", e.target.value)}
          />

        </FormGroup>

        <FormGroup label="Categoría">

          <TextInput
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />

        </FormGroup>

      </FormRow>

      <FormRow>

        <FormGroup label="Ecosistema">

          <TextInput
            value={form.ecosystem}
            onChange={(e) => updateField("ecosystem", e.target.value)}
          />

        </FormGroup>

        <FormGroup label="Estado de conservación">

          <TextInput
            value={form.conservation_status}
            onChange={(e) => updateField("conservation_status", e.target.value)}
          />

        </FormGroup>

      </FormRow>

      <FormGroup label="Método de propagación">

        <TextInput
          value={form.propagation_method}
          onChange={(e) => updateField("propagation_method", e.target.value)}
        />

      </FormGroup>

      <FormGroup label="Descripción">

        <TextArea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />

      </FormGroup>

      <FormGroup label="Hábitat">

        <TextArea
          value={form.habitat}
          onChange={(e) => updateField("habitat", e.target.value)}
        />

      </FormGroup>

      <FormGroup label="Distribución">

        <TextArea
          value={form.distribution}
          onChange={(e) => updateField("distribution", e.target.value)}
        />

      </FormGroup>

      <FormRow>

        <FormGroup label="Periodo de floración">

          <TextInput
            value={form.flowering_period}
            onChange={(e) => updateField("flowering_period", e.target.value)}
          />

        </FormGroup>

        <FormGroup label="Periodo de fructificación">

          <TextInput
            value={form.fruiting_period}
            onChange={(e) => updateField("fruiting_period", e.target.value)}
          />

        </FormGroup>

      </FormRow>

      <FormGroup label="Importancia ecológica">

        <TextArea
          value={form.ecological_importance}
          onChange={(e) => updateField("ecological_importance", e.target.value)}
        />

      </FormGroup>

      <FormGroup label="Uso en restauración">

        <TextArea
          value={form.restoration_use}
          onChange={(e) => updateField("restoration_use", e.target.value)}
        />

      </FormGroup>

      <FormGroup label="Recomendaciones de manejo">

        <TextArea
          value={form.care_recommendations}
          onChange={(e) => updateField("care_recommendations", e.target.value)}
        />

      </FormGroup>

      <FormGroup label="Observaciones">

        <TextArea
          value={form.observations}
          onChange={(e) => updateField("observations", e.target.value)}
        />

      </FormGroup>

      <FormRow>

        <FormGroup label="Latitud">

          <TextInput
            type="number"
            step="any"
            value={form.latitude}
            onChange={(e) => updateField("latitude", e.target.value)}
          />

        </FormGroup>

        <FormGroup label="Longitud">

          <TextInput
            type="number"
            step="any"
            value={form.longitude}
            onChange={(e) => updateField("longitude", e.target.value)}
          />

        </FormGroup>

      </FormRow>

      <PrimaryButton onClick={handleSubmit}>
        {submitLabel}
      </PrimaryButton>

    </Card>
  );
}

export default SpeciesForm;
