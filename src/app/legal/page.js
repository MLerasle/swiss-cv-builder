import { Container } from "@/components/Container";

export default function Legal() {
  return (
    <Container className="prose my-16">
      <h1>Mentions légales</h1>

      <h2>Responsable</h2>
      <p>Maxime Lerasle</p>
      <p>Chemin des Ormeaux 38</p>
      <p>1066 Epalinges (VD)</p>
      <p>contact@swisscvbuilder.ch</p>

      <h2>Hébergement</h2>
      <p>
        Le site SwissCVBuilder est hébergé par : Vercel Inc., dont le siège est
        situé à l'adresse ci-après :
      </p>
      <p className="italic">340 S Lemon Ave #4133 Walnut, CA 91789</p>
    </Container>
  );
}
