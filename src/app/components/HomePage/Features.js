const Features = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/GetFeatures`, {
    cache: "no-store",
  });

  console.log(response);
  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();
  console.log(features);
};
export default Features;
