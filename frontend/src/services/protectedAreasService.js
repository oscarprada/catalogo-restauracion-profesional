const API_URL = "http://localhost:3000/api/protected-areas";

export async function getProtectedAreas() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No fue posible obtener las áreas protegidas.");
  }

  return await response.json();
}
