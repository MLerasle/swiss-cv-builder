import { FormCertifications } from "@/components/builder/FormCertifications";
import { FormHobbies } from "@/components/builder/FormHobbies";
import { FormProjects } from "@/components/builder/FormProjects";
import { FormPublications } from "@/components/builder/FormPublications";
import { FormReferences } from "@/components/builder/FormReferences";
import { FormVolunteers } from "@/components/builder/FormVolunteers";

export const metadata = {
  title: "SwissCVBuilder - Autres sections",
  description: "Ajoutez d'autres sections optionnelles à votre CV Suisse.",
};

export default function Options() {
  return (
    <>
      <FormReferences />
      <FormCertifications />
      <FormProjects />
      <FormPublications />
      <FormVolunteers />
      <FormHobbies />
    </>
  );
}
