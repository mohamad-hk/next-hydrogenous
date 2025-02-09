const Features = async () => {
  const response = await fetch("https://smyowokinmmgmemhoqtl.supabase.co/api/Get/GetFeatures");
  const features = await response.json();

  return (
    <div>
      <h2>Features</h2>
      {JSON.stringify(features, null, 2)}
    </div>
  );
};
export default Features;
