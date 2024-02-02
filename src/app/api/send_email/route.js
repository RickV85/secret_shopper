import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const resend = new Resend(process.env.RESEND_TEST_API_KEY);
    const emailContent = await req.json();

    if (!emailContent) {
      throw new Error("Failure - no emailContent");
    }

    let { visitDate, userEmail, responses, photoUrl, comment } = emailContent;

    // Format visit date
    visitDate = new Date(visitDate).toLocaleDateString("en-US");

    const sendResult = await resend.batch.send([
      // Manager email
      {
        from: "Rick Vermeil <rick@rickvermeil.com>",
        to: ["rickv85@gmail.com"],
        subject: `New Secret Shopper Response`,
        html: `
        <body>
          <h1>New Secret Shopper Response</h1>
          <h2>From: ${userEmail} on ${visitDate}</h2>
          <h3>Survey responses</h3>
          <p>${responses}</p>
          <h3>Comments</h3>
          <p>${comment}</p>
          <img src="${photoUrl}" alt="Secret shopper uploaded photo" />
        </body>
        `,
      },
      // User email
      {
        from: "Rick Vermeil <rick@rickvermeil.com>",
        to: [userEmail],
        subject: "Thank you from Buttermilk Kitchen",
        html: `
        <body>
          <h1>Thank you for participating!</h1>
          <h2>Here are your responses from your visit on ${visitDate}</h2>
          <p>${responses}</p>
          <h3>Comments</h3>
          <p>${comment}</p>
          <img src="${photoUrl}" alt="Secret shopper uploaded photo" />
        </body>
        `,
      },
    ]);

    if (sendResult.error) {
      console.log(sendResult.error);
      throw new Error("Failure - Resend failed");
    }

    return NextResponse.json({ data: { message: "Email successfully sent" } });
  } catch (error) {
    let status = 500;
    let errorCode = "UNKNOWN_ERROR";
    if (error.message === "Failure - Resend failed") {
      status = 502;
      errorCode = "RESEND_FAILED";
    } else if (error.message === "Failure - no emailContent") {
      status = 400;
      errorCode = "NO_EMAIL_CONTENT";
    }
    return NextResponse.json(
      { error: { message: error.message, code: errorCode }, data: null },
      {status: status}
    );
  }
}
