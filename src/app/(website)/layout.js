import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { getUser } from "@/lib/actions";

export const metadata = {
  title: "SwissCVBuilder",
  description:
    "Générer un CV pour le marché de l'emploi Suisse en quelques minutes.",
};

export default async function RootLayout({ children }) {
  const { data } = await getUser();

  return (
    <>
      <Header user={data?.user} />
      {children}
      <Footer />
    </>
  );
}
