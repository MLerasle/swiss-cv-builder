import { create } from "zustand";

import {
  personalData,
  experienceData,
  trainingData,
  referenceData,
} from "@/store/data";

const experiences = [experienceData];
const skills = [{ skill: "" }];
const education = [trainingData];
const references = [referenceData];
const summary = "";

const steps = {
  1: "personalData",
  2: "experiences",
  3: "skills",
  4: "education",
  5: "references",
  6: "summary",
};

const useFormStore = create((set) => ({
  personalData,
  experiences,
  skills,
  education,
  references,
  summary,
  setData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [steps[step]]: data,
    })),
}));

export default useFormStore;
