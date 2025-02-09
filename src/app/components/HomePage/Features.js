const Features = async () => {
  const response = await fetch(`https://hydrogenous.vercel.app/api/GetFeatures`,);

  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();
  return features
};
export default Features;
