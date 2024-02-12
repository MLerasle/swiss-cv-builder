import { Roboto } from "next/font/google";

import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/app/(website)/providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata = {
  title: "SwissCVBuilder",
  description:
    "Générer un CV pour le marché de l'emploi Suisse en quelques minutes.",
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`h-full scroll-smooth bg-white antialiased ${roboto.className}`}
    >
      <body id="body" className="flex h-full flex-col relative">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
