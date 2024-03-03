import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/AuthForm";
import { getUser, login, signup } from "@/lib/actions";

export default async function LoginPage() {
  const { data } = await getUser();

  if (data.user) {
    return redirect("/");
  }

  return <AuthForm login={login} signup={signup} />;
}
