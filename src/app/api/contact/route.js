import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "mail.infomaniak.com",
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_PASSWORD,
  },
  secure: true,
});

export async function POST(request) {
  const formData = await request.json();

  const mailData = {
    from: process.env.CONTACT_EMAIL,
    to: "contact@swisscvbuilder.ch",
    subject: `Swiss CV Builder contact from <${formData.email}>`,
    text: formData.message,
    html: formData.message,
  };

  try {
    await transporter.sendMail(mailData);
    return NextResponse.json({
      message: "Succesfully sent email!",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: err, status: 500 });
  }
}
