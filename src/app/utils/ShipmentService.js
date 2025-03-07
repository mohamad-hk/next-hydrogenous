export const getShipment = async (input_params) => {
  try {
    const response = await fetch(
      `https://hydrogenous.vercel.app/api/GetShipment?${input_params}`
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
