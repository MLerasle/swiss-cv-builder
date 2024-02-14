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
        <CountrySelector
          selectedCountry={country}
          onSelect={(country) => setCountry(country.iso2)}
          buttonStyle={{
            backgroundColor: "transparent",
            border: "none",
          }}
          buttonContentWrapperStyle={{
            marginTop: "16px",
          }}
          dropdownStyleProps={{
            style: {
              zIndex: 50,
            },
          }}
        />
      }
      {...restProps}
    />
  );
};
