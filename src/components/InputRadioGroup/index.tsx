import React from "react";
import "./_inputRadioGroup.scss";

interface Option {
  label: string;
  value: string;
}

interface InputRadioGroupProps {
  options: Option[];
  defaultOption?: string;
  onChange?: (value: string) => void;
}

const InputRadioGroup: React.FC<InputRadioGroupProps> = ({
  options,
  defaultOption,
  onChange,
}) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="inputRadioGroup">
      {options.map((option, index) => (
        <label key={index} className="inputRadioGroup-label">
          <input
            type="radio"
            name="radioGroup"
            value={option.value}
            onChange={handleRadioChange}
            checked={option.value === defaultOption}
            className="inputRadioGroup-input"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default InputRadioGroup;
