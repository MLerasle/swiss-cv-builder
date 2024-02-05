import { Font } from "@react-pdf/renderer";

import Template1 from "@/images/templates/template1.png";
import Template2 from "@/images/templates/template2.png";
import Template3 from "@/images/templates/template3.png";
import Template4 from "@/images/templates/template4.png";

import { Skills } from "@/components/templates/sections/Skills";
import { Experiences } from "@/components/templates/sections/Experiences";
import { Education } from "@/components/templates/sections/Education";
import { Certifications } from "@/components/templates/sections/Certifications";
import { Projects } from "@/components/templates/sections/Projects";
import { Languages } from "@/components/templates/sections/Languages";
import { References } from "@/components/templates/sections/References";
import { Hobbies } from "@/components/templates/sections/Hobbies";

const fonts = [
  "Arimo",
  "CrimsonText",
  "FiraSans",
  "Lato",
  "Lora",
  "Merriweather",
  "Montserrat",
  "NotoSerif",
  "OpenSans",
  "Poppins",
  "Raleway",
  "Roboto",
  "Ubuntu",
  "WorkSans",
];

for (const font of fonts) {
  Font.register({
    family: font,
    fonts: [
      {
        src: `/fonts/${font}/${font}-Regular.ttf`,
      },
      {
        src: `/fonts/${font}/${font}-Bold.ttf`,
        fontWeight: "bold",
      },
      {
        src: `/fonts/${font}/${font}-Italic.ttf`,
        fontWeight: "normal",
        fontStyle: "italic",
      },
      {
        src: `/fonts/${font}/${font}-BoldItalic.ttf`,
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });
}

const steps = [
  {
    id: 1,
    key: "personalData",
    title: "Veuillez saisir vos coordonnées",
    href: "/resume/builder/personal-infos",
  },
  {
    id: 2,
    key: "experiences",
    title: "Parlez-nous de votre expérience",
    href: "/resume/builder/experiences",
  },
  {
    id: 3,
    key: "skills",
    title: "Parlez-nous de vos compétences",
    href: "/resume/builder/skills",
  },
  {
    id: 4,
    key: "languages",
    title: "Quelles langues parlez-vous ?",
    href: "/resume/builder/languages",
  },
  {
    id: 5,
    key: "education",
    title: "Veuillez indiquer votre formation",
    href: "/resume/builder/education",
  },
  {
    id: 6,
    key: "certifications",
    title: "Veuillez indiquer vos certifications",
    href: "/resume/builder/certifications",
  },
  {
    id: 7,
    key: "references",
    title: "Veulliez indiquer vos références",
    href: "/resume/builder/references",
  },
  {
    id: 8,
    key: "projects",
    title: "Avez-vous réalisé des projets personnels ?",
    href: "/resume/builder/projects",
  },
  {
    id: 9,
    key: "hobbies",
    title: "Quels sont vos loisirs ?",
    href: "/resume/builder/hobbies",
  },
  {
    id: 10,
    key: "summary",
    title: "Parlez-nous de votre parcours et de vos objectifs",
    href: "/resume/builder/summary",
  },
  {
    id: 11,
    key: "layout",
    title: "Personnalisez votre CV",
    href: "/resume/builder/resume-layout",
  },
];

const sections = [
  {
    key: "personalData",
    name: "Informations Personnelles",
  },
  {
    key: "experiences",
    name: "Expérience Professionnelle",
  },
  {
    key: "skills",
    name: "Compétences",
  },
  {
    key: "languages",
    name: "Langues",
  },
  {
    key: "education",
    name: "Formation",
  },
  {
    key: "certifications",
    name: "Certifications",
  },
  {
    key: "references",
    name: "Références",
  },
  {
    key: "projects",
    name: "Projets Personnels",
  },
  {
    key: "hobbies",
    name: "Loisirs",
  },
  {
    key: "summary",
    name: "Résumé",
  },
];

const pdfSections = [
  { key: "skills", template: Skills },
  { key: "experiences", template: Experiences },
  { key: "education", template: Education },
  { key: "certifications", template: Certifications },
  { key: "projects", template: Projects },
  { key: "languages", template: Languages },
  { key: "references", template: References },
  { key: "hobbies", template: Hobbies },
];

// Get default left and right sections for a given template
const getTemplateSections = (templateName) => {
  const tmplSections = { left: [], right: [] };
  switch (templateName) {
    case "template1":
      tmplSections.left = [
        "skills",
        "experiences",
        "education",
        "certifications",
        "projects",
        "languages",
        "references",
        "hobbies",
      ];
      break;
    case "template2":
      tmplSections.left = ["skills", "experiences", "education"];
      tmplSections.right = [
        "certifications",
        "projects",
        "languages",
        "references",
        "hobbies",
      ];
      break;
    case "template3":
      tmplSections.left = [
        "skills",
        "experiences",
        "education",
        "certifications",
        "projects",
        "languages",
        "references",
        "hobbies",
      ];

      break;
    case "template4":
      tmplSections.left = [
        "skills",
        "certifications",
        "languages",
        "references",
        "hobbies",
      ];
      tmplSections.right = ["experiences", "education", "projects"];
      break;
    default:
      break;
  }
  return tmplSections;
};

const templates = [
  {
    name: "template1",
    defaultColor: "#0891b2",
    previewImg: Template1,
    sections: getTemplateSections("template1"),
  },
  {
    name: "template2",
    defaultColor: "#0284c7",
    previewImg: Template2,
    sections: getTemplateSections("template2"),
  },
  {
    name: "template3",
    defaultColor: "#b91c1c",
    previewImg: Template3,
    sections: getTemplateSections("template3"),
  },
  {
    name: "template4",
    defaultColor: "#f59e0b",
    previewImg: Template4,
    sections: getTemplateSections("template4"),
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

export function useResume() {
  return {
    templates,
    colors,
    fonts,
    sections,
    steps,
    pdfSections,
  };
}
