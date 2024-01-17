import { extendVariants, Select } from "@nextui-org/react";

export const BaseSelect = extendVariants(Select, {
  variants: {
    color: {
      white: {
        trigger: [
          "bg-white",
          "shadow-none",
          "border",
          "data-[hover=true]:bg-white",
          "data-[hover=true]:border-primary",
          "data-[open=true]:border-primary",
          "data-[focus=true]:border-primary",
          "data-[focus=true]:border-primary",
          "group-data-[focus=true]:bg-white",
        ],
        innerWrapper: [
          "bg-white",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:bg-white",
        ],
        helperWrapper: ["bg-white"],
      },
    },
  },
  defaultVariants: {
    color: "white",
  },
});
