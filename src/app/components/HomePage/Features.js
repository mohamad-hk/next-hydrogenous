const Features = async function () {
  try {
    const response = await fetch(
      "https://hydrogenous.vercel.app/api/GetFeatures",
      {
        cache: "no-store", 
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch features (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching features:", error.message);
  }
};

export default Features;
