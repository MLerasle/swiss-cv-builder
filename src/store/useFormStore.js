import { create } from "zustand";

import {
  personalData,
  experienceData,
  trainingData,
  referenceData,
  certificationData,
} from "@/store/data";

const experiences = [experienceData];
const skills = [{ skill: "" }];
const languages = [{ language: "", level: "" }];
const education = [trainingData];
const references = [referenceData];
const certifications = [certificationData];
const summary = "";

const steps = {
  1: "personalData",
  2: "experiences",
  3: "skills",
  4: "languages",
  5: "education",
  6: "certifications",
  7: "references",
  8: "summary",
};

const useFormStore = create((set) => ({
  personalData,
  experiences,
  skills,
  languages,
  education,
  certifications,
  references,
  summary,
  setData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [steps[step]]: data,
    })),
}));

export default useFormStore;
