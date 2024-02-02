import Link from "next/link";

import { useResume } from "@/hooks/useResume";

export default function FormSteps({ pathname }) {
  const { steps } = useResume();
  const currentStepId = steps.findIndex((s) => s.href === pathname) + 1;

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-start my-2 py-8 z-50 w-full"
      aria-label="Progress"
    >
      <p className="text-sm font-medium">
        Step {currentStepId} of {steps.length}
      </p>
      <ol
        role="list"
        className="sm:ml-8 mt-4 sm:mt-0 flex items-center space-x-5"
      >
        {steps.map((step) => (
          <li key={step.key}>
            {step.id < currentStepId ? (
              <Link
                href={step.href}
                className="block h-2.5 w-2.5 rounded-full bg-blue-600 hover:bg-blue-900"
              >
                <span className="sr-only">{step.key}</span>
              </Link>
            ) : step.id === currentStepId ? (
              <Link
                href={step.href}
                className="relative flex items-center justify-center"
                aria-current="step"
              >
                <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                  <span className="h-full w-full rounded-full bg-blue-200" />
                </span>
                <span
                  className="relative block h-2.5 w-2.5 rounded-full bg-blue-600"
                  aria-hidden="true"
                />
                <span className="sr-only">{step.key}</span>
              </Link>
            ) : (
              <Link
                href={step.href}
                className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
              >
                <span className="sr-only">{step.key}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
