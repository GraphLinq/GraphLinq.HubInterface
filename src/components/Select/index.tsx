import React, { useState } from "react";
import "./_select.scss";
import Arrow from "@assets/icons/arrow.svg?react";
import Check from "@assets/icons/check.svg?react";

interface SelectProps {
  options: React.ReactNode[];
  active: number;
  onChange?: (index: number) => void;
}

const Select: React.FC<SelectProps> = ({ options, active, onChange }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOptionClick = (index: number) => {
    if (onChange) {
      onChange(index);
    }
    setOpen(false);
  };

  return (
    <div className="select" data-open={isOpen}>
      <div className="select-current" onClick={() => setOpen(!isOpen)}>
        {options[active]}
        <div className="select-arrow">
          <Arrow />
        </div>
      </div>
      <div className="select-options">
        {options.map((opt, i) => (
          <div
            className="select-option"
            key={i}
            onClick={() => handleOptionClick(i)}
          >
            {opt}
            {active === i && <Check />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
