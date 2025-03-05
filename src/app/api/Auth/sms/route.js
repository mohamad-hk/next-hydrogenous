import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || !body.phone) {
      return NextResponse.json(
        { success: false, message: "شماره موبایل اشتباه است" },
        { status: 400 }
      );
    }

    const { phone } = body;

    const code = (1000 + Math.random() * 9000).toFixed(0);

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

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: `Error Service: ${text}` },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      code,
      response: JSON.parse(text),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error ", error: error.message },
      { status: 500 }
    );
  }
}
