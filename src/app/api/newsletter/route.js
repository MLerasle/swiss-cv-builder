import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request) {
  const formData = await request.json();
  const subscriberEmail = formData.email;

  const postData = {
    api_key: process.env.OCTOPUS_API_KEY,
    email_address: subscriberEmail,
  };

  try {
    await fetch(
      `https://emailoctopus.com/api/1.6/lists/${process.env.OCTOPUS_LIST_ID}/contacts`,
      {
        method: "POST",
        port: 443,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    return NextResponse.json({
      message: "Succesfully added subscriber!",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: err, status: 500 });
  }
}
