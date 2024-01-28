"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { faqs } from "@/lib/faq";

export function Faq() {
  return (
    <div id="faq" className="py-24 sm:py-32 bg-slate-50">
      <Container>
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Questions fréquentes
          </h2>
        </FadeIn>
        <FadeIn className="mx-auto max-w-4xl mt-16">
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.question}
                title={faq.question}
                className="text-gray-900 font-medium "
              >
                {faq.answer.map((answer, index) => (
                  <p
                    key={index}
                    className={`text-base leading-7 text-gray-600 font-normal mt-2 mb-6 `}
                  >
                    {answer}
                  </p>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </Container>
    </div>
  );
}
