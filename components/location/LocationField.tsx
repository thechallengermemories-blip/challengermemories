"use client";

import React, { useMemo, useState } from "react";
import { Country, State, ICountry, IState } from "country-state-city";
import { SearchableSelect, SelectOption } from "./Searchableselect";

interface LocationFieldProps {
  inputBaseStyles: string;
  labelStyles: string;
}

export const LocationField: React.FC<LocationFieldProps> = ({ inputBaseStyles, labelStyles }) => {
  const countries: ICountry[] = useMemo(() => Country.getAllCountries(), []);

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const states: IState[] = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode]
  );

  const selectedCountry = countries.find((c) => c.isoCode === countryCode);
  const selectedState = states.find((s) => s.isoCode === stateCode);

  const countryOptions: SelectOption[] = useMemo(
    () => countries.map((c) => ({ value: c.isoCode, label: c.name, prefix: c.flag })),
    [countries]
  );

  const stateOptions: SelectOption[] = useMemo(
    () => states.map((s) => ({ value: s.isoCode, label: s.name })),
    [states]
  );

  const handleCountryChange = (iso: string) => {
    setCountryCode(iso);
    setStateCode(""); // reset state whenever country changes
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-1">
        <label className={labelStyles}>Country</label>
        <SearchableSelect
          options={countryOptions}
          value={countryCode}
          onChange={handleCountryChange}
          placeholder="Select a country"
          inputBaseStyles={inputBaseStyles}
          emptyMessage="No countries match your search."
        />
      </div>

      <div className="space-y-1">
        <label className={labelStyles}>State / Province</label>
        <SearchableSelect
          options={stateOptions}
          value={stateCode}
          onChange={setStateCode}
          placeholder="Select a state / province"
          disabled={!countryCode || states.length === 0}
          disabledPlaceholder={!countryCode ? "Select a country first" : "No states listed"}
          inputBaseStyles={inputBaseStyles}
          emptyMessage="No states match your search."
        />
      </div>

      {/* Hidden fields submitted with the form — store readable names, not iso codes */}
      <input type="hidden" name="country" value={selectedCountry?.name ?? ""} />
      <input type="hidden" name="state" value={selectedState?.name ?? ""} />
    </div>
  );
};