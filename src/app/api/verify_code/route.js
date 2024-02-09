import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userCode = await req.json();
    const secretCodes = JSON.parse(process.env.SECRET_CODES);

    if (secretCodes.includes(userCode)) {
      return NextResponse.json({ data: { verified: true } });
    } else {
      return NextResponse.json({ data: { verified: false } });
    }
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message, code: "SERVER_ERROR" }, data: null },
      { status: 500 }
    );
  }
}
