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
const education = [trainingData];
const references = [referenceData];
const certifications = [certificationData];
const summary = "";

const steps = {
  1: "personalData",
  2: "experiences",
  3: "skills",
  4: "education",
  5: "certifications",
  6: "references",
  7: "summary",
};

const useFormStore = create((set) => ({
  personalData,
  experiences,
  skills,
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
