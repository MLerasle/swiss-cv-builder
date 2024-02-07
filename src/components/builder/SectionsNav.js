import { createElement } from "react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function SectionsNav({ steps, currentStep }) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pb-8" : "",
              "relative"
            )}
          >
            <>
              {stepIdx !== steps.length - 1 ? (
                <div
                  className="absolute left-10 top-4 -ml-px mt-0.5 h-full w-0.5 bg-slate-500"
                  aria-hidden="true"
                />
              ) : null}
              <Link
                href={step.href}
                className="group relative flex items-center px-6"
              >
                <span className="flex h-9 items-center" aria-hidden="true">
                  <span
                    className={classNames(
                      "relative z-10 flex h-8 w-8 items-center justify-center rounded-md group-hover:bg-slate-400",
                      currentStep.key === step.key
                        ? "bg-blue-500 group-hover:bg-blue-500"
                        : "bg-slate-500"
                    )}
                  >
                    {createElement(step.icon, {
                      className: `h-5 w-5 group-hover:text-white ${
                        currentStep.key === step.key
                          ? "text-white"
                          : "text-slate-200"
                      }`,
                    })}
                  </span>
                </span>
                <span className="ml-4 min-w-0">
                  <span
                    className={classNames(
                      "text-sm font-medium group-hover:text-white",
                      currentStep.key === step.key
                        ? "text-white"
                        : "text-slate-400"
                    )}
                  >
                    {step.name}
                  </span>
                </span>
              </Link>
            </>
          </li>
        ))}
      </ol>
    </nav>
  );
}
