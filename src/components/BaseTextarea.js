import { extendVariants, Textarea } from "@nextui-org/react";

export const BaseTextarea = extendVariants(Textarea, {
  variants: {
    color: {
      white: {
        inputWrapper: [
          "bg-white",
          "border",
          "transition-colors",
          "shadow-none",
          "focus-within:bg-white",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:bg-white",
          "group-data-[focus=true]:border-primary",
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
