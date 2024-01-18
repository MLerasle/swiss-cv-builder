import { Roboto } from "next/font/google";

import "@/styles/globals.css";
import { Providers } from "@/app/(website)/providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props) {
  return (
    <html
      lang="fr"
      className={`h-full scroll-smooth antialiased ${roboto.className}`}
    >
      <body id="body" className="flex h-full flex-col relative">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
