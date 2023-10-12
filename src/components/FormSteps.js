import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";

const steps = [
  {
    id: 1,
    name: "Personal Informations",
    href: "/resume/builder/personal-infos",
  },
  {
    id: 2,
    name: "Work Experiences",
    href: "/resume/builder/work-experiences",
  },
  {
    id: 3,
    name: "Skills",
    href: "/resume/builder/skills",
  },
  {
    id: 4,
    name: "Education",
    href: "/resume/builder/education",
  },
  {
    id: 5,
    name: "References",
    href: "/resume/builder/references",
  },
  {
    id: 6,
    name: "Summary",
    href: "/resume/builder/summary",
  },
];

export default function FormSteps({ pathname }) {
  const currentStepId = steps.findIndex((s) => s.href === pathname) + 1;

  return (
    <>
      <nav
        className="flex items-center justify-start sticky top-0 py-4 bg-white z-100 lg:hidden"
        aria-label="Progress"
      >
        <p className="text-sm font-medium">
          Step {currentStepId} of {steps.length}
        </p>
        <ol role="list" className="ml-8 flex items-center space-x-5">
          {steps.map((step) => (
            <li key={step.name}>
              {step.id < currentStepId ? (
                <Link
                  href={step.href}
                  className="block h-2.5 w-2.5 rounded-full bg-blue-600 hover:bg-blue-900"
                >
                  <span className="sr-only">{step.name}</span>
                </Link>
              ) : step.id === currentStepId ? (
                <Link
                  href={step.href}
                  className="relative flex items-center justify-center"
                  aria-current="step"
                >
                  <span
                    className="absolute flex h-5 w-5 p-px"
                    aria-hidden="true"
                  >
                    <span className="h-full w-full rounded-full bg-blue-200" />
                  </span>
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full bg-blue-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </Link>
              ) : (
                <Link
                  href={step.href}
                  className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
                >
                  <span className="sr-only">{step.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <nav
        className="hidden lg:block sticky top-0 bg-white z-50"
        aria-label="Progress"
      >
        <ol
          role="list"
          className="divide-y divide-gray-900/5 rounded-md shadow-sm ring-1 ring-gray-900/5 lg:flex lg:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative lg:flex lg:flex-1">
              {step.id < currentStepId ? (
                <Link
                  href={step.href}
                  className="group flex w-full items-center"
                >
                  <span className="flex items-center px-6 py-2 lg:py-4 text-sm font-medium">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
                      <CheckIcon
                        className="h-3 w-3 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </Link>
              ) : step.id === currentStepId ? (
                <Link
                  href={step.href}
                  className="flex items-center px-6 py-2 lg:py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-blue-600">
                    <span className="text-blue-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-blue-600">
                    {step.name}
                  </span>
                </Link>
              ) : (
                <Link href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 py-2 lg:py-4 text-sm">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </Link>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 lg:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
