import Template1 from "@/images/templates/template1.png";
import Template2 from "@/images/templates/template2.png";
import Template3 from "@/images/templates/template3.png";
import Template4 from "@/images/templates/template4.png";

const templates = [
  {
    name: "template1",
    columns: 1,
    defaultColor: "#0891b2",
    previewImg: Template1,
  },
  {
    name: "template2",
    columns: 2,
    defaultColor: "#0284c7",
    previewImg: Template2,
  },
  {
    name: "template3",
    columns: 1,
    defaultColor: "#b91c1c",
    previewImg: Template3,
  },
  {
    name: "template4",
    columns: 2,
    defaultColor: "#f59e0b",
    previewImg: Template4,
  },
];

const colors = [
  "#6b7280",
  "#4b5563",
  "#374151",
  "#1f2937",
  "#030712",
  "#eab308",
  "#f59e0b",
  "#f97316",
  "#ea580c",
  "#c2410c",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#22c55e",
  "#16a34a",
  "#10b981",
  "#059669",
  "#047857",
  "#0d9488",
  "#0f766e",
  "#0ea5e9",
  "#0284c7",
  "#0369a1",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
];

const fonts = [
  {
    family: "Courier",
    styles: {
      normal: "Courier",
      bold: "Courier-Bold",
      italic: "Courier-Oblique",
      bolditalic: "Courier-BoldOblique",
    },
  },
  {
    family: "Helvetica",
    styles: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italic: "Helvetica-Oblique",
      bolditalic: "Helvetica-BoldOblique",
    },
  },
  {
    family: "Times New Roman",
    styles: {
      normal: "Times-Roman",
      bold: "Times-Bold",
      italic: "Times-Italic",
      bolditalic: "Times-BoldItalic",
    },
  },
];

const sections = [
  {
    id: 1,
    key: "personalData",
    name: "Informations Personnelles",
    formTitle: "Veuillez saisir vos coordonnées",
    formHref: "/resume/builder/personal-infos",
  },
  {
    id: 2,
    key: "experiences",
    name: "Expérience Professionnelle",
    formTitle: "Parlez-nous de votre expérience",
    formHref: "/resume/builder/experiences",
  },
  {
    id: 3,
    key: "skills",
    name: "Compétences",
    formTitle: "Parlez-nous de vos compétences",
    formHref: "/resume/builder/skills",
  },
  {
    id: 4,
    key: "languages",
    name: "Langues",
    formTitle: "Quelles langues parlez-vous ?",
    formHref: "/resume/builder/languages",
  },
  {
    id: 5,
    key: "education",
    name: "Formation",
    formTitle: "Veuillez indiquer votre formation",
    formHref: "/resume/builder/education",
  },
  {
    id: 6,
    key: "certifications",
    name: "Certifications",
    formTitle: "Veuillez indiquer vos certifications",
    formHref: "/resume/builder/certifications",
  },
  {
    id: 7,
    key: "references",
    name: "Références",
    formTitle: "Veulliez indiquer vos références",
    formHref: "/resume/builder/references",
  },
  {
    id: 8,
    key: "projects",
    name: "Projets Personnels",
    formTitle: "Avez-vous réalisé des projets personnels ?",
    formHref: "/resume/builder/projects",
  },
  {
    id: 9,
    key: "hobbies",
    name: "Loisirs",
    formTitle: "Quels sont vos loisirs ?",
    formHref: "/resume/builder/hobbies",
  },
  {
    id: 10,
    key: "summary",
    name: "Résumé",
    formTitle: "Parlez-nous de votre parcours et de vos objectifs",
    formHref: "/resume/builder/summary",
  },
  {
    id: 11,
    formTitle: "Personnalisez votre CV",
    formHref: "/resume/builder/resume-layout",
  },
];

export function useResume() {
  return {
    templates,
    colors,
    fonts,
    sections,
  };
}
