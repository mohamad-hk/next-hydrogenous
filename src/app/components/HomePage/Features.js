const Features = async () => {
  const response = await fetch("https://hydrogenous.vercel.app/api/GetFeatures", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch features (Status: ${response.status})`);
  }

  const features = await response.json();

  return (
    <div>
      <h2>Features</h2>
      {features.length > 0 ? (
        features.map((feature) => (
          <div key={feature.feature_id}>
            <h3>{feature.feature_heading}</h3>
            <p>{feature.feature_content}</p>
            {feature.feature_image && <img src={feature.feature_image} alt={feature.feature_heading} />}
          </div>
        ))
      ) : (
        <p>No features found.</p>
      )}
    </div>
  );
};

export default Features;
