import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const emailContent = await req.json();
    console.log(emailContent);

    return NextResponse.json({ message: "Success", status: 200 });
  } catch {
    return NextResponse.json({ message: "Error - message failed", status: 400 });
  }
}
