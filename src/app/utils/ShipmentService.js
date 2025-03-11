export const getShipment = async (input_params) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/Profile/Shipments/GetShipment?${input_params}`
    );

    if (!response.ok) {
      console.error("Failed to fetch:", response.status);
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching :", error);
    return null;
  }
};
