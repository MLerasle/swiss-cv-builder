"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";
import Logo from "@/images/logo.svg";

const navlinks = [
  {
    href: "/guides/comment-faire-un-cv-suisse",
    label: "Comment faire un CV suisse",
  },
];

export function Header({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      maxWidth="xl"
      height="6rem"
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-x-3"
          >
            <Image
              src={Logo}
              alt="SwissCVBuilder logo"
              className="h-10 w-auto"
            />
            <div className="flex items-center gap-x-2">
              <div className="text-xl font-medium leading-8 text-gray-800">
                Swiss<span className="text-blue-700">CV</span>Builder
              </div>
              <div className="hidden sm:inline-block text-xs bg-blue-500 shadow-md shadow-blue-500/50 text-white font-semibold tracking-wider px-4 py-1 rounded-full">
                BETA
              </div>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navlinks.map(({ href, label }) => (
          <NavbarItem key={href}>
            <Link color="foreground" href={href}>
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            radius="full"
            href="/signin"
            variant="light"
          >
            Se connecter
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            radius="full"
            href="/signup"
            variant="flat"
          >
            S'inscrire
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navlinks.map(({ href, label }) => (
          <NavbarMenuItem key={href}>
            <Link href={href} size="lg" className="w-full" color="foreground">
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
