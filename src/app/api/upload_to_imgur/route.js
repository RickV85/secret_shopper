import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const imgFormData = await req.formData();
    const imgData = imgFormData.get("base64");
    const imgurApiKey = process.env.IMGUR_CLIENT_ID;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${imgurApiKey}`);

    const formdata = new FormData();
    formdata.append("image", `${imgData}`);
    formdata.append("type", "base64");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const imgurRes = await fetch(
      "https://api.imgur.com/3/image",
      requestOptions
    );

    let imgurText = await imgurRes.text();

    return NextResponse.json({ resBody: imgurText, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 502 });
  }
}
