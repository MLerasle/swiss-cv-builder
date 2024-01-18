import Link from "next/link";
import { Button } from "@nextui-org/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

export default function FormActions({ prevLink, lastStep }) {
  return (
    <div className="flex justify-between items-center my-8">
      {prevLink ? (
        <Link href={prevLink} passHref legacyBehavior>
          <Button
            startContent={
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            }
          >
            Précédent
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
      {lastStep ? (
        <Button
          color="primary"
          type="submit"
          startContent={
            <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
          }
        >
          Télécharger mon CV
        </Button>
      ) : (
        <Button
          color="primary"
          type="submit"
          endContent={
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          }
        >
          Suivant
        </Button>
      )}
    </div>
  );
}
