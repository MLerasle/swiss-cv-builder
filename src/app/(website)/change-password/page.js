import Image from "next/image";
import Logo from "@/images/logo.svg";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";

export default function ChangePassword() {
  return (
    <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={Logo}
          alt="SwissCVBuilder logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Modifiez votre mot de passe
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Entrez votre nouveau mot de passe ci-dessous.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px] mt-6">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
