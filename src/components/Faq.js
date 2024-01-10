"use client";

import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

import { Container } from "@/components/Container";
import { faqs } from "@/lib/faq";

export function Faq() {
  return (
    <div id="faq" className="py-24 sm:py-32 bg-gray-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-4 pr-12">
                      {faq.answer.map((answer, index) => (
                        <p
                          key={index}
                          className={`text-base leading-7 text-gray-600 ${
                            index > 0 && "mt-4"
                          }`}
                        >
                          {answer}
                        </p>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
