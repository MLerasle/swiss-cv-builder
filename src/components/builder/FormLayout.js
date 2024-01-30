"use client";

import { useState } from "react";

import { BaseColorPicker } from "@/components/UI/BaseColorPicker";
import { BaseFontPicker } from "@/components/UI/BaseFontPicker";
import FormActions from "@/components/builder/FormActions";
import useFormStore from "@/store/useFormStore";
import { colors, fonts } from "@/lib/resume-layout";

export function FormLayout() {
  const { template, setTemplate } = useFormStore();
  const [color, setColor] = useState(template.color || "#eab308");
  const [font, setFont] = useState(template.font || "Helvetica");

  const updateTemplateColor = (newColor) => {
    setColor(newColor);
    setTemplate({ ...template, color: newColor });
  };

  const updateTemplateFont = (newFont) => {
    setFont(newFont);
    setTemplate({ ...template, font: newFont });
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
          <BaseColorPicker
            colors={colors}
            defaultColor={color}
            onChange={updateTemplateColor}
          />
        </div>
      </section>
      <section className="mt-16">
        <h3 className="block text-lg font-semibold leading-6 text-gray-900">
          Polices
        </h3>
        <p className="text-gray-600 mt-2">Choisissez la police de caractères</p>
      </section>
      <div className="mt-6">
        <BaseFontPicker
          selected={font}
          fonts={fonts}
          onChange={updateTemplateFont}
        />
      </div>

      <div className="mt-16">
        <FormActions prevLink="/resume/builder/summary" lastStep />
      </div>
    </form>
  );
}
