import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userCode = await req.json();
    const secretCode = process.env.SECRET_CODE;
    console.log({userCode}, {secretCode})

    if (userCode === secretCode) {
      return NextResponse.json({ verified: true, status: 200 });
    } else {
      return NextResponse.json({ verified: false, status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
