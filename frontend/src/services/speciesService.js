const API = "http://localhost:3000/api/protected-areas";

export async function getSpeciesByArea(id) {
  const response = await fetch(`${API}/${id}/species`);

  if (!response.ok) {
    throw new Error("No fue posible obtener las especies.");
  }

  return await response.json();
}
