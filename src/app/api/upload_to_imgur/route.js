import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const imgFormData = await req.formData();
    const imgurApiKey = process.env.IMGUR_CLIENT_ID;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${imgurApiKey}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: imgFormData,
      redirect: "follow",
    };

    const imgurRes = await fetch(
      "https://api.imgur.com/3/image",
      requestOptions
    );

    const imgurResParsed = await imgurRes.json();

    return NextResponse.json({ data: imgurResParsed.data });
  } catch (error) {
    return NextResponse.json({ error: { message: error.message, code: "IMGUR_UPLOAD_FAILED" }, data: null }, 502);
  }
}
