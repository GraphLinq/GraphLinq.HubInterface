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
  let timeoutId: NodeJS.Timeout;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);

    let newValue = e.target.value !== "" ? e.target.value : '0';
    
    if (parseFloat(newValue) > max) {
      newValue = max.toString();
    }
    
          e.target.value = newValue;
    
          if (!isNaN(parseFloat(newValue)) && onChange) {
            onChange(newValue);
          }

    timeoutId = setTimeout(() => {

    }, 500);
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
      {currencyText && <div className="inputNumber-currency">{currencyText}</div>}
    </div>
  );
};

export default InputNumber;
