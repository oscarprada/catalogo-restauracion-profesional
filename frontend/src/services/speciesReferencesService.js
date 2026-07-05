const API = "http://localhost:3000/api/species";

export async function getSpeciesReferences(speciesId) {

  const response = await fetch(
    `${API}/${speciesId}/references`
  );

  if (!response.ok) {
    throw new Error("No fue posible obtener las referencias.");
  }

  return await response.json();

}

export async function createSpeciesReference(speciesId, reference) {

  const response = await fetch(
    `${API}/${speciesId}/references`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reference)
    }
  );

  if (!response.ok) {
    throw new Error("No fue posible registrar la referencia.");
  }

  return await response.json();

}
