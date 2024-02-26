import React from "react";
import "./_inputNumber.scss"; // Assurez-vous d'importer le fichier de style CSS ou SCSS approprié

interface InputNumberProps {
  icon: React.ReactNode;
  currencyText: string;
  value: number;
  max: number;
  onChange?: (value: number) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({ icon, currencyText, max, value, onChange }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);

    if (newValue > max) {
      newValue = max;
    }

    if (!isNaN(newValue) && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="inputNumber">
      <div className="inputNumber-icon">
        {icon}
      </div>
      <input
        type="number"
        value={value}
        max={max}
        onChange={handleInputChange}
        className="inputNumber-input"
      />
      <div className="inputNumber-currency">
        {currencyText}
      </div>
    </div>
  );
};

export default InputNumber;
