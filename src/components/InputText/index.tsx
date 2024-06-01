import React from "react";
import "./style.scss";

interface InputTextProps {
  icon?: React.ReactNode;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({
  icon,
  value,
  placeholder,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="inputText">
      {icon && <div className="inputText-icon">{icon}</div>}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        minLength={1}
        onChange={handleInputChange}
        className="inputText-input"
      />
    </div>
  );
};

export default InputText;
