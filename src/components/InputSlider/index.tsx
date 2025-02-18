import React from "react";
import "./style.scss";
import ReactSlider from "react-slider";

interface InputSliderProps {
  value: string;
  min: number;
  max: number;
  onChange?: (value: string) => void;
}

const InputSlider: React.FC<InputSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const handleInputChange = (value: number) => {
    const newValue = value;

    if (onChange) {
      onChange(newValue.toString());
    }
  };

  return (
    <div className="inputSlider">
      <ReactSlider
        className="inputSlider-input"
        value={parseInt(value)}
        min={min}
        max={max}
        onChange={handleInputChange}
        renderThumb={({ key, ...restProps }: { key: string }) => (
          <div key={key} {...restProps}></div>
        )}
      />

      <div className="inputSlider-extra">{value}%</div>
    </div>
  );
};

export default InputSlider;
