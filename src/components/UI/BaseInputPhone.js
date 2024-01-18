import "react-international-phone/style.css";
import {
  defaultCountries,
  usePhoneInput,
  CountrySelector,
} from "react-international-phone";

import { BaseInput } from "@/components/UI/BaseInput";

export const BaseInputPhone = ({ value, onChange, ...restProps }) => {
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "ch",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <BaseInput
      label="Téléphone"
      type="tel"
      value={phone}
      onChange={handlePhoneValueChange}
      ref={inputRef}
      startContent={
        <div className="flex items-center">
          <CountrySelector
            selectedCountry={country}
            onSelect={(country) => setCountry(country.iso2)}
            buttonStyle={{
              backgroundColor: "transparent",
              border: "none",
            }}
            dropdownStyleProps={{
              style: {
                zIndex: 50,
              },
            }}
          />
        </div>
      }
      {...restProps}
    />
  );
};
