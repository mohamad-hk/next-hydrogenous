import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { phone } = await req.json();
    const code = (10000 + Math.random() * 90000).toFixed(0);

    const response = await fetch("https://api.sms.ir/v1/send/verify/", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SMS_IR_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Mobile: phone,
        TemplateId: 737106,
        Parameters: [{ name: "CODE", value: code }],
      }),
    });

    const text = await response.text();
    if (!response.ok)
      return NextResponse.json(
        { success: false, message: `Error: ${text}` },
        { status: response.status }
      );

    return NextResponse.json({
      success: true,
      code,
      response: JSON.parse(text),
    });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
