// services/carService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5132";

export async function fetchCars() {
  const response = await fetch(`${API_URL}/api/cars`);
  return await response.json();
}