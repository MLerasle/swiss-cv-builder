export const months = [
  { num: "01", name: "Janvier" },
  { num: "02", name: "Février" },
  { num: "03", name: "Mars" },
  { num: "04", name: "Avril" },
  { num: "05", name: "Mai" },
  { num: "06", name: "Juin" },
  { num: "07", name: "Juillet" },
  { num: "08", name: "Août" },
  { num: "09", name: "Septembre" },
  { num: "10", name: "Octobre" },
  { num: "11", name: "Novembre" },
  { num: "12", name: "Décembre" },
];

const currentYear = new Date().getFullYear();
export const years = Array.from(
  { length: currentYear - 1964 + 1 },
  (_, i) => i + 1964
)
  .reverse()
  .map((i) => i.toString());

export const languageLevels = [
  "Langue maternelle",
  "Niveau A1",
  "Niveau A2",
  "Niveau B1",
  "Niveau B2",
  "Niveau C1",
  "Niveau C2",
];

export const workPermits = ["Permis B", "Permis C", "Permis G", "Permis L"];
