import { Svg, Path } from "@react-pdf/renderer";

export function MobileIcon({ stroke, fill }) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      stroke={stroke}
      stroke-width="1.5"
      width="12"
      height="12"
    >
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        fill={fill}
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </Svg>
  );
}
