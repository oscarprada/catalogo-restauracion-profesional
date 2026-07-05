const API_URL = "http://localhost:3000/api/protected-areas";

export async function getProtectedAreas() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No fue posible obtener las áreas protegidas.");
  }

  return await response.json();

}

export async function createProtectedArea(area) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(area)
  });

  if (!response.ok) {
    throw new Error("No fue posible crear el área protegida.");
  }

  return await response.json();

}

export async function updateProtectedArea(id, area) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(area)
  });

  if (!response.ok) {
    throw new Error("No fue posible actualizar el área protegida.");
  }

  return await response.json();

}

export async function deleteProtectedArea(id) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("No fue posible eliminar el área protegida.");
  }

  return await response.json();

}