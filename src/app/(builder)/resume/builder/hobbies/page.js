import { FormHobbies } from "@/components/builder/FormHobbies";

export const metadata = {
  title: "SwissCVBuilder - Hobbies",
  description:
    "Ajoutez vos loisirs à votre CV si ceux-ci permettent de mettre en avant certains de vos points forts.",
};

export default function Hobbies() {
  return <FormHobbies />;
}
