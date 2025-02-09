const Features = async () => {
  const response = await fetch("https://your-vercel-app.vercel.app/api/GetFeatures", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();

  return (
    <div>
      <h2>Features</h2>
      <pre>{JSON.stringify(features, null, 2)}</pre>
    </div>
  );
};
export default Features;
