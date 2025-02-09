const baseUrl =
  process.env.hydrogenous_NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

const response = await fetch(`${baseUrl}/api/GetFeatures`, {
  cache: "no-store",
});
