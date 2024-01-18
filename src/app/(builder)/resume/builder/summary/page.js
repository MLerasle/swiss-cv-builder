import { FormSummary } from "@/components/builder/FormSummary";

export const metadata = {
  title: "SwissCVBuilder - Résumé",
  description:
    "Ajoutez un résumé à votre CV pour permettre au recruteur d'identifier vos objectifs professionnels.",
};

export default function Summary() {
  return <FormSummary />;
}
