import { RadioGroup } from "@nextui-org/react";

import { BaseRadio } from "@/components/UI/BaseRadio";

export function BaseFontPicker({ fonts, selected, onChange }) {
  return (
    <RadioGroup orientation="horizontal" defaultValue={selected}>
      {fonts.map((font) => (
        <BaseRadio
          key={font.family}
          value={font.family}
          onChange={() => onChange(font.family)}
        >
          {font.family}
        </BaseRadio>
      ))}
    </RadioGroup>
  );
}
