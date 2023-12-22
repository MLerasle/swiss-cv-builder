"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/Container";
import { NavLink } from "@/components/NavLink";
import Logo from "@/images/logo.svg";

const navlinks = [
  { href: "#benefits", label: "Bénéfices" },
  { href: "#features", label: "Fonctionnalités" },
  // { href: "#pricing", label: "Tarif" },
  { href: "#faq", label: "FAQ" },
];

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            {navlinks.map((link) => (
              <MobileNavLink key={link.href} href={link.href}>
                {link.label}
              </MobileNavLink>
            ))}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="py-10 shadow">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-x-3"
            >
              <Image src={Logo} className="h-10 w-auto" />
              <div className="text-xl font-medium leading-8 text-gray-800">
                CV<span className="text-blue-700">Builder</span>
              </div>
            </Link>
            {pathname === "/" && (
              <div className="hidden md:flex md:gap-x-6">
                {navlinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {pathname.startsWith("/resume/builder") ? (
              <></>
            ) : pathname.startsWith("/resume/preview") ? (
              <Link href="/resume/builder">
                <Button color="primary">Retour à l'éditeur</Button>
              </Link>
            ) : (
              <Link href="/resume/builder">
                <Button color="primary">
                  Générer <span className="hidden lg:inline">mon </span>CV
                </Button>
              </Link>
            )}
            {pathname === "" && (
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
