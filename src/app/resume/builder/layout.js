"use client";

import { usePathname } from "next/navigation";

import FormSteps from "@/components/FormSteps";

export default function BuilderTemplate(props) {
  const pathname = usePathname();

  return (
    <>
      <FormSteps pathname={pathname} />
      <section>{props.children}</section>
    </>
  );
}
