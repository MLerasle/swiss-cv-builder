import { create } from "zustand";

import { personalData, experienceData } from "@/store/data";

const experiences = [experienceData];
const skills = [{ skill: "" }];

const steps = {
  1: "personalData",
  2: "experiences",
  3: "skills",
};

const useFormStore = create((set) => ({
  personalData,
  experiences,
  skills,
  setData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [steps[step]]: data,
    })),
}));

export default useFormStore;
