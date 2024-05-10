import React, { useCallback } from "react";
import "./style.scss";

interface InputToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const InputToggle: React.FC<InputToggleProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleChange = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <label className="inputToggle">
      <span className="inputToggle-label">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="inputToggle-input"
      />
      <span className="inputToggle-slider" />
    </label>
  );
};

export default InputToggle;
