const Features = async () => {
  const baseUrl ="http://localhost:3000" ||process.env.hydrogenous_NEXT_PUBLIC_SUPABASE_URL;
  const response = await fetch(`${baseUrl}/api/GetFeatures`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();
};
export default Features;
