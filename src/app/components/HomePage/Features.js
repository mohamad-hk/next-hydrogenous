const Features = async () => {
  const baseUrl = "https://smyowokinmmgmemhoqtl.supabase.co";
  const response = await fetch(`${baseUrl}/api/GetFeatures`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();
};
export default Features;
