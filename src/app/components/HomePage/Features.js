const Features = async () => {
  const response = await fetch("/api/GetFeatures");
  const features = await response.json();

  return (
    <div>
      <h2>Features</h2>
      {JSON.stringify(features, null, 2)}
    </div>
  );
};
export default Features;
