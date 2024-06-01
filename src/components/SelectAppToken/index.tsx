import "./style.scss";
import Arrow from "@assets/icons/arrow.svg?react";
import Unknown from "@assets/icons/unknown.svg?react";
import Check from "@assets/icons/check.svg?react";
import React, { useState, useEffect } from "react";
import useTokenInfo from "../../composables/useTokenInfos";
import { AppToken } from "@constants/apptoken";
import InputText from "@components/InputText";

interface SelectAppTokenProps {
  options: AppToken[];
  active: number;
  onChange?: (index: number, custom?: AppToken) => void;
}

const SelectAppToken: React.FC<SelectAppTokenProps> = ({
  options,
  active,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customOptions, setCustomOptions] = useState<AppToken[]>(options);
  const [selectedOption, setSelectedOption] = useState(active);
  const [customAppToken, setCustomAppToken] = useState<AppToken | null>(null);

  const tokenData = useTokenInfo(inputValue);

  useEffect(() => {
    if (tokenData.tokenName && !tokenData.loading && !tokenData.error) {
      const newAppToken: AppToken = {
        icon: <Unknown />,
        name: tokenData.tokenSymbol,
        address: {
          mainnet: undefined,
          glq: inputValue as `0x${string}`,
        },
        decimals: tokenData.tokenDecimals,
      };

      if (!customOptions.some((opt) => opt.name === newAppToken.name)) {
        setCustomOptions([...options, newAppToken]);
        setCustomAppToken(newAppToken);
        setInputValue("");
      }
    }
  }, [tokenData]);

  const handleOptionClick = (index: number) => {
    if (onChange) {
      if (index >= options.length && customAppToken) {
        onChange(index, customAppToken);
      } else {
        onChange(index);
      }
    }
    setSelectedOption(index);
    setOpen(false);
  };

  return (
    <div className="selectAppToken" data-open={isOpen}>
      <div className="selectAppToken-current" onClick={() => setOpen(!isOpen)}>
        {customOptions[selectedOption].icon}{" "}
        <span>{customOptions[selectedOption].name}</span>
        <div className="selectAppToken-arrow">
          <Arrow />
        </div>
      </div>
      <div className="selectAppToken-options">
        {customOptions.map((opt, i) => (
          <div
            className="selectAppToken-option"
            key={i}
            onClick={() => handleOptionClick(i)}
          >
            {opt.icon} <span>{opt.name}</span>
            {selectedOption === i && <Check />}
          </div>
        ))}

        <div className="selectAppToken-input" data-disabled={tokenData.loading}>
          <p>Non-listed token :</p>
          <InputText
            placeholder="Token address"
            value={inputValue}
            onChange={setInputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectAppToken;
