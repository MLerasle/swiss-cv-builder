"use client";

import { useState } from "react";

import { BaseColorPicker } from "@/components/UI/BaseColorPicker";
import { BaseFontPicker } from "@/components/UI/BaseFontPicker";
import { BaseDragAndDrop } from "@/components/UI/BaseDragAndDrop";
import useFormStore from "@/store/useFormStore";
import { useResume } from "@/hooks/useResume";

export function FormLayout() {
  const { template, setTemplate } = useFormStore();
  const { colors, fonts } = useResume();
  const [color, setColor] = useState(template.color || "#eab308");
  const [font, setFont] = useState(template.font || "Roboto");

  const updateTemplateColor = (newColor) => {
    setColor(newColor);
    setTemplate({ ...template, color: newColor });
  };

  const updateTemplateFont = (newFont) => {
    setFont(newFont);
    setTemplate({ ...template, font: newFont });
  };

  const updateSections = (sections) => {
    setTemplate({ ...template, sections });
  };

  return (
    <div className="my-8">
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
        <div className="mt-6">
          <BaseFontPicker
            selected={font}
            fonts={fonts}
            onChange={updateTemplateFont}
          />
        </div>
      </section>
      {template.sections && template.sections.left.length > 0 && (
        <section className="mt-16">
          <h3 className="block text-lg font-semibold leading-6 text-gray-900">
            Mise en page
          </h3>
          <p className="text-gray-600 mt-2">
            Glissez-déposez les sections pour réorganiser votre CV
          </p>
          <div className="mt-6">
            <BaseDragAndDrop
              sections={template.sections}
              onUpdate={updateSections}
            />
          </div>
        </section>
      )}
    </div>
  );
}
