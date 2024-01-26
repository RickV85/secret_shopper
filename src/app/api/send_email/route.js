import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const emailContent = await req.json();
    console.log(emailContent);

    if (!emailContent) {
      throw new Error("Failure - no emailContent");
    }

    const { responses, photo } = emailContent;
    // return NextResponse.json("Testing")

    const resend = new Resend(process.env.RESEND_TEST_API_KEY);

    const sendResult = await resend.batch.send([
      {
        from: "Rick <rick@rickvermeil.com>",
        to: ["rickv85@gmail.com"],
        subject: "hello world",
        html: `
        <body>
          <h1>it works!</h1>
          <p>${responses.q1}</p>
          <img src="${photo}" alt="Secret shopper uploaded photo" />
        </ body>
        `,
      },
      // SEND MULTIPLE EMAILS WITH BATCH.SEND -
      // USE TO SEND A COPY TO MANAGER AND RESPONDENT

      // {
      //   from: "Acme <onboarding@resend.dev>",
      //   to: ["bar@outlook.com"],
      //   subject: "world hello",
      //   html: "<p>it works!</p>",
      // },
    ]);

    if (sendResult.error) {
      console.log(sendResult.error);
      throw new Error("Failure - Resend failed");
    }

    return NextResponse.json({ message: "Success", status: 200 });
  } catch (error) {
    if (error.message === "Failure - Resend failed") {
      return NextResponse.json({
        message: error.message,
        status: 502,
      });
    } else if (error.message === "Failure - no emailContent") {
      return NextResponse.json({
        message: error.message,
        status: 400,
      });
    } else {
      return NextResponse.json({
        message: "Failure - Unknown server error",
        status: 500,
      });
    }
  }
}
