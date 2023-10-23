import { Roboto } from "next/font/google";

import "@/styles/globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Resume Builder",
  description: "Generate your resume in a few minutes.",
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
      lang="en"
      className={`h-full scroll-smooth bg-white antialiased ${roboto.className}`}
    >
      <body className="flex h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
