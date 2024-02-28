import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "SwissCVBuilder",
  description:
    "Générer un CV pour le marché de l'emploi Suisse en quelques minutes.",
};

export default async function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
