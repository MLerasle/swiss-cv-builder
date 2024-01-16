import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "SwissCVBuilder - Contact",
};

export default function Contact() {
  return (
    <Container>
      <ContactForm />
    </Container>
  );
}
