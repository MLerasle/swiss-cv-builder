import { redirect } from "next/navigation";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { getUser } from "@/lib/actions";

export default async function ChangePassword() {
  const { data } = await getUser();
  if (!data.user) {
    return redirect("/login");
  }

  return <ChangePasswordForm />;
}
