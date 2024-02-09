import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const imgFormData = await req.formData();
    const imgurApiKey = process.env.IMGUR_CLIENT_ID;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${imgurApiKey}`);
    myHeaders.append("Content-Type", "multipart/form-data");

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
    console.error(error);
    return NextResponse.json(
      {
        error: { message: error.message, code: "IMGUR_UPLOAD_FAILED" },
        data: null,
      },
      { status: 502 }
    );
  }
}
