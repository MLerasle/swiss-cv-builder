"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

export function FormNavigation({ prevLink, nextLink }) {
  return (
    <div className="h-24 z-50 shadow-inner px-6 sm:px-8 flex items-center gap-x-6 bg-slate-100">
      {prevLink && (
        <Link className="flex-1" href={prevLink} passHref legacyBehavior>
          <Button
            className="w-full bg-white"
            variant="bordered"
            size="lg"
            startContent={
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
            }
          >
            Précédent
          </Button>
        </Link>
      )}
      {nextLink ? (
        <Link className="flex-1" href={nextLink} passHref legacyBehavior>
          <Button
            color="primary"
            className="w-full"
            size="lg"
            endContent={
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            }
          >
            Suivant
          </Button>
        </Link>
      ) : (
        <Link className="flex-1" href="/resume/preview" legacyBehavior>
          <Button
            color="primary"
            className="w-full"
            size="lg"
            endContent={
              <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
            }
          >
            Télécharger mon CV
          </Button>
        </Link>
      )}
    </div>
  );
}
