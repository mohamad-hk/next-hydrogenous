const Features = async () => {
  const baseUrl = process.env.hydrogenous_NEXT_PUBLIC_SUPABASE_URL||"http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/GetFeatures`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();
};
export default Features;
