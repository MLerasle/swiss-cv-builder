import { RadioGroup } from "@nextui-org/react";

import { BaseRadio } from "@/components/UI/BaseRadio";

export function BaseFontPicker({ fonts }) {
  return (
    <RadioGroup orientation="horizontal">
      {fonts.map((font) => (
        <BaseRadio key={font} value={font}>
          {font}
        </BaseRadio>
      ))}
    </RadioGroup>
  );
}
