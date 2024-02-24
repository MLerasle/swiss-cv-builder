import Image from "next/image";
import Logo from "@/images/logo.svg";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={Logo}
          alt="SwissCVBuilder logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Mot de passe oublié ?
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Entrez votre email ci-dessous et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px] mt-6">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
