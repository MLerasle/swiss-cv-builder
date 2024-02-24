import Image from "next/image";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/AuthForm";
import Logo from "@/images/logo.svg";
import { getUser, login, signup } from "@/lib/actions";

export default async function LoginPage() {
  const { data } = await getUser();

  if (data.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={Logo}
          alt="SwissCVBuilder logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connectez-vous pour créer votre CV Suisse
        </h2>
      </div>

      <AuthForm login={login} signup={signup} />
    </div>
  );
}
