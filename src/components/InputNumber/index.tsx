import React from "react";
import "./_inputNumber.scss"; // Assurez-vous d'importer le fichier de style CSS ou SCSS approprié

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
    let newValue = e.target.value !== "" ? parseFloat(e.target.value).toString() : "0";
    
    if (parseFloat(newValue) > max) {
      newValue = max.toString();
    }

    e.target.value = newValue;

    if (!isNaN(parseFloat(newValue)) && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="inputNumber">
      {icon && <div className="inputNumber-icon">{icon}</div>}
      <input
        type="number"
        value={value}
        max={max}
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
