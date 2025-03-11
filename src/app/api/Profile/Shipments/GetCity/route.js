import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("tbl_state")
      .select("state_id, state_name");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ error: "No provinces found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
      }
    );
  }
}
