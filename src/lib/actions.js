"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = createClient();
  return supabase.auth.getUser();
}

export async function login(data) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const formData = {
    email: DOMPurify.sanitize(data.email),
    password: DOMPurify.sanitize(data.password),
  };

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(data) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const formData = {
    email: DOMPurify.sanitize(data.email),
    password: DOMPurify.sanitize(data.password),
  };

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    redirect("/login?message=Could not register user");
  }

  revalidatePath("/", "layout");
  redirect("/");
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
      redirectTo: "http://localhost:3000/change-password",
    }
  );
  if (error) {
    redirect("/forgot-password?message=Could not send reset link");
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
  redirect("/login");
}
