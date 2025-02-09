const Features = async () => {
  const response = await fetch("https://hydrogenous.vercel.app/api/GetFeatures");
  console.log(response)
  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();
  console.log(features);
};
export default Features;
