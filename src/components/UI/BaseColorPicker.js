import { CheckIcon } from "@heroicons/react/20/solid";

export function BaseColorPicker({ colors, defaultColor, onChange }) {
  const updateColor = (e, color) => {
    e.preventDefault();
    onChange(color);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {colors.map((presetColor) => (
        <button
          key={presetColor}
          className="rounded-full w-8 h-8 flex justify-center items-center"
          style={{ background: presetColor }}
          onClick={(e) => updateColor(e, presetColor)}
        >
          {defaultColor === presetColor && (
            <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
}
