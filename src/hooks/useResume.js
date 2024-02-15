import { Font } from "@react-pdf/renderer";

import {
  AcademicCapIcon,
  BoltIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  IdentificationIcon,
  LanguageIcon,
  PaintBrushIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

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
import { Volunteers } from "@/components/templates/sections/Volunteers";
import { Publications } from "@/components/templates/sections/Publications";

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

const sections = [
  {
    id: 1,
    key: "personalData",
    name: "Coordonnées",
    href: "/resume/builder/personal-infos",
    icon: IdentificationIcon,
  },
  {
    id: 2,
    key: "experiences",
    name: "Expérience",
    href: "/resume/builder/experiences",
    icon: BriefcaseIcon,
  },
  {
    id: 3,
    key: "skills",
    name: "Compétences",
    href: "/resume/builder/skills",
    icon: BoltIcon,
  },
  {
    id: 4,
    key: "education",
    name: "Formation",
    href: "/resume/builder/education",
    icon: AcademicCapIcon,
  },
  {
    id: 5,
    key: "languages",
    name: "Langues",
    href: "/resume/builder/languages",
    icon: LanguageIcon,
  },
  {
    id: 6,
    key: "summary",
    name: "Résumé",
    href: "/resume/builder/summary",
    icon: ChatBubbleLeftIcon,
  },
  {
    id: 7,
    key: "options",
    name: "Autres sections",
    href: "/resume/builder/options",
    icon: SquaresPlusIcon,
  },
  {
    id: 8,
    key: "layout",
    name: "Personnalisation",
    href: "/resume/builder/resume-layout",
    icon: PaintBrushIcon,
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
  { key: "publications", template: Publications },
  { key: "volunteers", template: Volunteers },
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
        "publications",
        "volunteers",
      ];
      break;
    case "template2":
      tmplSections.left = ["skills", "experiences", "education"];
      tmplSections.right = [
        "certifications",
        "projects",
        "languages",
        "references",
        "publications",
        "volunteers",
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
        "publications",
        "volunteers",
      ];

      break;
    case "template4":
      tmplSections.left = [
        "skills",
        "certifications",
        "languages",
        "references",
        "hobbies",
        "publications",
        "volunteers",
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
    pdfSections,
  };
}
