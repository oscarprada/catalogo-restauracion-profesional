const API = "http://localhost:3000/api/species";

export async function getSpeciesExperiences(speciesId) {

  const response = await fetch(
    `${API}/${speciesId}/experiences`
  );

  if (!response.ok) {
    throw new Error("No fue posible obtener las experiencias.");
  }

  return await response.json();

}

export async function createSpeciesExperience(speciesId, experience) {

  const response = await fetch(
    `${API}/${speciesId}/experiences`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(experience)
    }
  );

  if (!response.ok) {
    throw new Error("No fue posible registrar la experiencia.");
  }

  return await response.json();

}
