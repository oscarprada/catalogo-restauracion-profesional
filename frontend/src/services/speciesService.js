const API = "http://localhost:3000/api/species";

export async function getSpeciesByArea(areaId) {

  const response = await fetch(`${API}/area/${areaId}`);

  if (!response.ok) {
    throw new Error("No fue posible obtener las especies.");
  }

  return await response.json();

}

export async function getSpeciesById(id) {

  const response = await fetch(`${API}/${id}`);

  if (!response.ok) {
    throw new Error("No fue posible obtener la especie.");
  }

  return await response.json();

}

export async function createSpecies(areaId, species) {

  const response = await fetch(`${API}/area/${areaId}`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(species)

  });

  if (!response.ok) {
    throw new Error("No fue posible crear la especie.");
  }

  return await response.json();

}

export async function updateSpecies(id, species) {

  const response = await fetch(`${API}/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(species)

  });

  if (!response.ok) {
    throw new Error("No fue posible actualizar la especie.");
  }

  return await response.json();

}

export async function deleteSpecies(id) {

  const response = await fetch(`${API}/${id}`, {

    method: "DELETE"

  });

  if (!response.ok) {
    throw new Error("No fue posible eliminar la especie.");
  }

  return await response.json();

}
