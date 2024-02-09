import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const imgUploadBase64 = await req.json();
    const imgurApiKey = process.env.IMGUR_CLIENT_ID;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${imgurApiKey}`);

    const imgFormData = new FormData();
    imgFormData.append("image", imgUploadBase64);
    imgFormData.append("type", "base64");

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
