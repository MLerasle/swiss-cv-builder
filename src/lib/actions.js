"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import fetch from "node-fetch";
import DOMPurify from "isomorphic-dompurify";
import { createClient } from "@/utils/supabase/server";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";
  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  console.log("URL in getURL()", url);
  return url;
};

export async function getUser() {
  const supabase = createClient();
  return supabase.auth.getUser();
}

export async function login(data) {
  const supabase = createClient();

  const formData = {
    email: DOMPurify.sanitize(data.email),
    password: DOMPurify.sanitize(data.password),
  };

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect("/signin?error=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/onboard");
}

export async function signup(data) {
  const supabase = createClient();

  const formData = {
    email: DOMPurify.sanitize(data.email),
    password: DOMPurify.sanitize(data.password),
    options: {
      emailRedirectTo: `${getURL()}onboard`,
    },
  };

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    redirect("/signin?error=Could not register user");
  }

  revalidatePath("/", "layout");
  redirect("/signin?confirm=Validate your email");
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  redirect("/");
}

export async function sendResetPasswordLink(email) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    DOMPurify.sanitize(email),
    {
      redirectTo: `${getURL()}change-password`,
    }
  );
  if (error) {
    redirect("/forgot-password?error=Could not send reset link");
  }
  redirect("/forgot-password?message=Link sent");
}

export async function updatePassword(password) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: DOMPurify.sanitize(password),
  });
  if (error) {
    redirect("/change-password?error=Could not update password");
  }
  redirect("/change-password?message=Successfully updated password");
}

const transporter = nodemailer.createTransport({
  port: 465,
  host: "mail.infomaniak.com",
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_PASSWORD,
  },
  secure: true,
});

export async function sendContactMessage(data) {
  const mailData = {
    from: process.env.CONTACT_EMAIL,
    to: "contact@swisscvbuilder.ch",
    subject: `Swiss CV Builder contact from <${data.email}>`,
    text: data.message,
    html: data.message,
  };

  return new Promise((resolve, _) => {
    transporter.sendMail(mailData, function (error, _) {
      if (error) {
        resolve({ error: true });
      } else {
        resolve({ error: false });
      }
    });
  });
}

export async function subsribeToNewsletter(data) {
  const postData = {
    api_key: process.env.OCTOPUS_API_KEY,
    email_address: data.email,
  };

  return new Promise((resolve, _) => {
    fetch(
      `https://emailoctopus.com/api/1.6/lists/${process.env.OCTOPUS_LIST_ID}/contacts`,
      {
        method: "POST",
        port: 443,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    )
      .then(() => {
        resolve({ error: false });
      })
      .catch(() => {
        resolve({ error: true });
      });
  });
}

// Upload picture function
// import { writeFileSync } from "fs";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const data = await request.formData();
//   const file = data.get("picture");

//   if (!file) {
//     return NextResponse.json({ success: false });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   writeFileSync(`/tmp/${file.name}`, buffer);

//   return NextResponse.json({ success: true });
// }
