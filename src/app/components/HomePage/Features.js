const Features = async () => {
  const NEXT_PUBLIC_SITE_URL = "https://hydrogenous.vercel.app/";
  const response = await fetch(`${NEXT_PUBLIC_SITE_URL}/api/GetFeatures`);
  console.log(response);
  if (!response.ok) throw new Error("Failed to fetch features");

  const features = await response.json();
  //   console.log(features);
};
export default Features;
