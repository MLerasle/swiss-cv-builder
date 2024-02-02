"use client";

import { useEffect, useState, createElement } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { pdf } from "@react-pdf/renderer";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import src from "pdfjs-dist/build/pdf.worker.js";

import { ResumePreviewNavigator } from "@/components/builder/ResumePreviewNavigator";
import { Template1 } from "@/components/templates/Template1";
import { Template2 } from "@/components/templates/Template2";
import { Template3 } from "@/components/templates/Template3";
import { Template4 } from "@/components/templates/Template4";
import useFormStore from "@/store/useFormStore";

pdfjs.GlobalWorkerOptions.workerSrc = src;

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

export function ResumePreview() {
  const data = useFormStore((state) => state);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onPreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const onNextPage = () => {
    if (currentPage === numPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const onDocumentLoad = (d) => {
    setNumPages(d.numPages);
    setCurrentPage((prev) => Math.min(prev, d.numPages));
  };

  useEffect(() => {
    const resume = createElement(renderTemplate(data.template), {
      data,
      defaultColor: data.template.color,
      sections: data.template.sections,
    });
    pdf(resume)
      .toBlob()
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
      });
  }, [data]);

  return (
    <>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoad}>
        <Page key={currentPage} pageNumber={currentPage} />
      </Document>
      <ResumePreviewNavigator
        currentPage={currentPage}
        numPages={numPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </>
  );
}
