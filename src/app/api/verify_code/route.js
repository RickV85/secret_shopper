import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userCode = await req.json();
    const secretCode = process.env.SECRET_CODE;

    if (userCode === secretCode) {
      return NextResponse.json({data: { verified: true }, error: null });
    } else {
      return NextResponse.json({data: { verified: false }, error: null });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error.message, code: "SERVER_ERROR" }, data: null }, 500);
  }
}
