import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Logo from "@/images/logo.svg";

export const metadata = {
  title: "SwissCVBuilder",
  description:
    "Connectez vous à SwissCVBuilder pour générer un CV Suisse en quelques minutes.",
};

export default async function RootLayout({ children }) {
  return (
    <>
      <Navbar maxWidth="2xl" height="6rem" isBordered>
        <NavbarContent>
          <NavbarBrand>
            <Image
              src={Logo}
              alt="SwissCVBuilder logo"
              className="h-10 w-auto"
            />
            <div className="flex items-center gap-x-2 ml-3">
              <div className="text-xl font-medium leading-8 text-gray-800">
                Swiss<span className="text-blue-700">CV</span>Builder
              </div>
              <div className="hidden sm:inline-block text-xs bg-blue-500 shadow-md shadow-blue-500/50 text-white font-semibold tracking-wider px-4 py-1 rounded-full">
                BETA
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent>
      </Navbar>
      {children}
    </>
  );
}
