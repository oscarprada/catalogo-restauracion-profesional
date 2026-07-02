const API = "http://localhost:3000/api/species";

export async function deleteSpeciesImage(imageId) {

  const response = await fetch(
    `${API}/images/${imageId}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("No fue posible eliminar la imagen.");
  }

  return await response.json();

}
