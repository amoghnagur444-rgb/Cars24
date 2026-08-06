const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5203";

export const getCarSummaries = async () => {
  const response = await fetch(`${BASE_URL}/api/summaries`);
  if (!response.ok) {
    throw new Error("Failed to fetch car summaries");
  }
  return response.json();
};

// Alias to fix the casing mismatch with buy-car/index.tsx
export const getcarSummaries = getCarSummaries;

type CarDetails = {
  title: string;
  images: string[];
  price: string;
  emi: string;
  location: string;
  specs: {
    year: number;
    km: string;
    fuel: string;
    transmission: string;
    owner: string;
    insurance: string;
  };
  features: string[];
  highlights: string[];
};

export const createCar = async (carDetails: CarDetails) => {
  const response = await fetch(`${BASE_URL}/api/car`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carDetails),
  });
  return response.json();
};

export const getcarByid = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/car/${id}`);
  return response.json();
};