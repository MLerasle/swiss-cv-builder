import { FormPersonalInfos } from "@/components/builder/FormPersonalInfos";

export const metadata = {
  title: "SwissCVBuilder - Informations personnelles",
  description:
    "Démarrez la génération de votre cv en ligne en remplissant vos informations de contact.",
};

export default function PersonalInfos() {
  return <FormPersonalInfos />;
}
