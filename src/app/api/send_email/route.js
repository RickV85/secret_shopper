import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const emailContent = await req.json();
    console.log(emailContent);

    const resend = new Resend(process.env.RESEND_TEST_API_KEY);

    await resend.batch.send([
      {
        from: "Rick <rick@rickvermeil.com>",
        to: ["rickv85@gmail.com"],
        subject: "hello world",
        html: `<h1>it works!</h1>
        <p>${emailContent.q1}</p>
        `,
      },
      // {
      //   from: "Acme <onboarding@resend.dev>",
      //   to: ["bar@outlook.com"],
      //   subject: "world hello",
      //   html: "<p>it works!</p>",
      // },
    ]);

    return NextResponse.json({ message: "Success", status: 200 });
  } catch {
    return NextResponse.json({
      message: "Error - message failed",
      status: 400,
    });
  }
}
