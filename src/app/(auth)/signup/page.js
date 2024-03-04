import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/AuthForm";
import { getUser, signup } from "@/lib/actions";

const benefits = [
  "Créez un CV adapté au marché Suisse",
  "Augmentez vos chances d'être remarqué",
  "Captez l'attention des employeurs",
  "Répondez plus rapidement aux demandes d'emploi",
  "Convient à tous les emplois",
  "Des modèles efficaces qui donnent des résultats",
  "Remplissez simplement les cases",
  "Obtenez plus de choix de carrière grâce à un meilleur CV",
  "Prenez de l'avance sur la concurrence",
];

export default async function SignupPage() {
  const { data } = await getUser();

  if (data.user) {
    return redirect("/");
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start">
      <AuthForm page="signup" action={signup} />
      <div className="mx-auto p-8">
        <div className="bg-blue-50 rounded-md p-12 border border-dotted border-blue-300">
          <h2 className="text-2xl font-black leading-9 tracking-tight text-gray-900">
            Pourquoi SwissCVBuilder ?
          </h2>
          <ul className="my-8 space-y-4">
            {benefits.map((benefit) => (
              <li
                key="benefit"
                className="font-medium text-gray-800 flex items-center gap-x-2"
              >
                <span className="flex h-9 items-center" aria-hidden="true">
                  <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  </span>
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
