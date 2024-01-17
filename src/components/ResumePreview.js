"use client";

import { useEffect, useState, createElement } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { pdf } from "@react-pdf/renderer";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import src from "pdfjs-dist/build/pdf.worker.js";

import { Template1 } from "@/components/templates/Template1";
import { Template2 } from "@/components/templates/Template2";
import { Template3 } from "@/components/templates/Template3";
import { Template4 } from "@/components/templates/Template4";
import useFormStore from "@/store/useFormStore";

pdfjs.GlobalWorkerOptions.workerSrc = src;

export function ResumePreview() {
  const data = useFormStore((state) => state);
  const [pdfUrl, setPdfUrl] = useState(null);

  const renderTemplate = (template) => {
    switch (template) {
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

  useEffect(() => {
    const child = createElement(renderTemplate(data.template), { data });
    pdf(child)
      .toBlob()
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
      });
  }, [data]);

  return (
    <Document file={pdfUrl}>
      <Page pageNumber={1} />
    </Document>
  );
}
