import { extendVariants, Checkbox } from "@nextui-org/react";

export const BaseCheckbox = extendVariants(Checkbox, {
  variants: {
    color: {
      white: {
        wrapper: [
          "bg-white",
          "border",
          "transition-colors",
          "before:border-0",
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
