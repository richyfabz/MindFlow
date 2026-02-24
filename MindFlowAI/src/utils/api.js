const API_BASE_URL = "http://localhost:5000";

export async function fetchFromAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  return response.json();
}