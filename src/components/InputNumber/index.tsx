import React from "react";
import "./style.scss";

interface InputNumberProps {
  icon?: React.ReactNode;
  currencyText?: string;
  value: string;
  max: number;
  onChange?: (value: string) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  icon,
  currencyText,
  max,
  value,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(',', '.');

    if (parseFloat(newValue) > max) {
      newValue = max.toString();
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="inputNumber">
      {icon && <div className="inputNumber-icon">{icon}</div>}
      <input
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        value={value}
        placeholder="0"
        max={max}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        minLength={1}
        inputMode="decimal"
        onChange={handleInputChange}
        className="inputNumber-input"
      />
      {currencyText && (
        <div className="inputNumber-currency">{currencyText}</div>
      )}
    </div>
  );
};

export default InputNumber;
