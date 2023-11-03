"use client";

import { PDFViewer } from "@react-pdf/renderer";

import { Template1 } from "@/components/templates/Template1";
import useFormStore from "@/store/useFormStore";

export default function Preview() {
  const data = useFormStore((state) => state);

  return (
    <PDFViewer showToolbar width="100%" height={window.innerHeight}>
      <Template1 data={data} />
    </PDFViewer>
  );
}
