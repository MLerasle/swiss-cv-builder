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
