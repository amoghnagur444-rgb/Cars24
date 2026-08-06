const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5203";
const BASE_URL = `${API_BASE}/api/Appointment`;

export const createAppointment = async (userid: string, appointment: any) => {
  const response = await fetch(`${BASE_URL}?userId=${userid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
  return response.json();
};

export const getAppointmentbyid = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};
export const getappointmentbyuser = async (userId:string) => {
  const response = await fetch(`${BASE_URL}/user/${userId}/appointments`);
  return response.json();
};