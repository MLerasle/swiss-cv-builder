import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const personalData = {
  profilePicture: "",
  name: "",
  title: "",
  email: "",
  tel: "",
  nationality: "",
  permit: "",
  age: "",
  city: "",
  country: "",
  linkedinUrl: "",
};

export const experienceData = {
  company: "",
  companyDesc: "",
  title: "",
  city: "",
  country: "",
  current: false,
  fromMonth: "",
  fromYear: "",
  toMonth: "",
  toYear: "",
  description: "",
};

export const skillData = { skill: "" };

export const languageData = {
  language: "",
  level: "",
};

export const trainingData = {
  school: "",
  degree: "",
  field: "",
  country: "",
  city: "",
  fromMonth: "",
  fromYear: "",
  toMonth: "",
  toYear: "",
  description: "",
};

export const certificationData = {
  title: "",
  issuer: "",
  month: "",
  year: "",
};

export const referenceData = {
  name: "",
  company: "",
  position: "",
  email: "",
  tel: "",
};

export const projectData = {
  title: "",
  current: false,
  fromMonth: "",
  fromYear: "",
  toMonth: "",
  toYear: "",
  description: "",
  link: "",
};

export const hobbyData = { hobby: "" };

const steps = {
  1: "personalData",
  2: "experiences",
  3: "skills",
  4: "languages",
  5: "education",
  6: "certifications",
  7: "references",
  8: "projects",
  9: "hobbies",
  10: "summary",
};

const useFormStore = create(
  persist(
    (set) => ({
      template: "",
      personalData: {},
      experiences: [],
      skills: [],
      languages: [],
      education: [],
      certifications: [],
      references: [],
      projects: [],
      hobbies: [],
      summary: "",
      setTemplate: (template) =>
        set((state) => ({
          ...state,
          template,
        })),
      setData: ({ step, data }) =>
        set((state) => ({
          ...state,
          [steps[step]]: data,
        })),
    }),
    {
      name: "resume",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useFormStore;
