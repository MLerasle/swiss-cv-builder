"use client";

import { createElement } from "react";
import { PDFViewer } from "@react-pdf/renderer/lib/react-pdf.browser.es.js";

import { Template1 } from "@/components/templates/Template1";
import { Template2 } from "@/components/templates/Template2";
import { Template3 } from "@/components/templates/Template3";
import { Template4 } from "@/components/templates/Template4";
import useFormStore from "@/store/useFormStore";

export default function Preview() {
  const data = useFormStore((state) => state);

  const renderTemplate = (template) => {
    switch (template.name) {
      case "template1":
        return Template1;
      case "template2":
        return Template2;
      case "template3":
        return Template3;
      case "template4":
        return Template4;
    }
  };

  return (
    <PDFViewer showToolbar className="w-full h-screen">
      {createElement(renderTemplate(data.template), {
        data,
        defaultColor: data.template.color,
      })}
    </PDFViewer>
  );
}
