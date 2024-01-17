import { extendVariants, Input } from "@nextui-org/react";

export const BaseInput = extendVariants(Input, {
  variants: {
    color: {
      white: {
        inputWrapper: [
          "bg-white",
          "border",
          "transition-colors",
          "shadow-none",
          "focus-within:bg-white",
          "focus-within:outline-none",
          "focus-within:border-primary",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:bg-white",
          "group-data-[focus=true]:ring-0",
          "group-data-[focus=true]:ring-offset-0",
        ],
      },
    },
  },
  defaultVariants: {
    color: "white",
  },
});
