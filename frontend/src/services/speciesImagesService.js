const API = "http://localhost:3000/api/species";

export async function getSpeciesImages(id) {
  const response = await fetch(`${API}/${id}/images`);

  if (!response.ok) {
    throw new Error("No fue posible obtener las imágenes.");
  }

  return await response.json();
}

