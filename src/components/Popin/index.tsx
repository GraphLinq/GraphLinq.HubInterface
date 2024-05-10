import "./style.scss";
import Close from "@assets/icons/close.svg?react";
import React from "react";

interface PopinProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Popin: React.FC<PopinProps> = ({ title, onClose, children }) => {
  return (
    <div className="popin">
      <div className="popin-shadow" onClick={onClose}></div>
      <div className="popin-content">
        <div className="popin-close" onClick={onClose}>
          <Close />
        </div>
        {title && <div className="popin-title">{title}</div>}
        <div className="popin-desc">{children}</div>
      </div>
    </div>
  );
};

export default Popin;
