import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "SwissCVBuilder - Contact",
};

export default function Contact() {
  return (
    <div className="bg-slate-50">
      <Container>
        <ContactForm />
      </Container>
    </div>
  );
}
