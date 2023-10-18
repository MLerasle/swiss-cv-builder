export const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const currentYear = new Date().getFullYear();
export const years = Array.from(
  { length: currentYear - 1964 + 1 },
  (_, i) => i + 1964
)
  .reverse()
  .map((i) => i.toString());

export const languageLevels = [
  "Niveau A1",
  "Niveau A2",
  "Niveau B1",
  "Niveau B2",
  "Niveau C1",
  "Niveau C2",
];

export const workPermits = [
  "Aucun Permis",
  "Permis B",
  "Permis C",
  "Permis G",
  "Permis L",
];

export const nationalities = ["Française", "Suisse"];
