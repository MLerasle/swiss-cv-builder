import "@/styles/globals.css";
import { Providers } from "@/app/providers";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Resume Builder",
  description: "Generate your resume in a few minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full text-base antialiased light">
      <body className="flex min-h-full flex-col">
        <Providers>
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
