import React from "react";
import "./style.scss";
import Close from "@assets/icons/close.svg?react";

interface InputTextProps {
  icon?: React.ReactNode;
  afterText?: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
}

const InputText: React.FC<InputTextProps> = ({
  icon,
  afterText,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleReset = () => {
    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className="inputText">
      {icon && <div className="inputText-icon">{icon}</div>}
      <input
        type="text"
        value={value}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        onChange={handleInputChange}
        placeholder={placeholder}
        className="inputText-input"
        {...props}
      />
      <div
        className="inputText-reset"
        onClick={handleReset}
        data-active={value !== ""}
      >
        <Close />
      </div>
    </div>
  );
};

export default InputText;
