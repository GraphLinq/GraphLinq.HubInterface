import React, { useRef } from "react";
import "./style.scss";
import Button from "@components/Button";
import Datetime from "@assets/icons/datetime.svg?react";

interface InputDatetimeProps {
  placeholder?: string;
  value: string | null;
  onChange?: (value: string) => void;
}

const InputDatetime: React.FC<InputDatetimeProps> = ({
  placeholder,
  value,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="inputDatetime" {...props}>
      <div className="inputDatetime-label">
        {value
          ? new Date(value).toLocaleString()
          : placeholder}
      </div>
      <div className="inputDatetime-actions">
        <Button onClick={handleButtonClick}>
          <Datetime />
        </Button>
        <input
          type="datetime-local"
          ref={inputRef}
          onChange={handleInputChange}
          className="inputDatetime-input"
          value={value ?? undefined}
        />
      </div>
    </div>
  );
}

export default InputDatetime;
