"use client";

import { useState } from "react";

import { BaseColorPicker } from "@/components/UI/BaseColorPicker";
import FormActions from "./FormActions";
import useFormStore from "@/store/useFormStore";

export function FormLayout() {
  const { template, setTemplate } = useFormStore();
  const [color, setColor] = useState("#eab308");

  const updateTemplateColor = (newColor) => {
    setColor(newColor);
    setTemplate({ ...template, color: newColor });
  };

  return (
    <form>
      <section className="my-8">
        <h3 className="block text-lg font-semibold leading-6 text-gray-900">
          Couleurs
        </h3>
        <p className="text-gray-600 mt-2">
          Choisissez la couleur de votre modèle
        </p>
        <div className="mt-6">
          <BaseColorPicker color={color} onChange={updateTemplateColor} />
        </div>
      </section>
      {/* <section className="mt-16">
        <h3 className="block text-lg font-semibold leading-6 text-gray-900">
          Polices
        </h3>
        <p className="text-gray-600 mt-2">Choisissez la police de caractères</p>
      </section> */}

      <div className="mt-16">
        <FormActions prevLink="/resume/builder/summary" lastStep />
      </div>
    </form>
  );
}
