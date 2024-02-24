import React from 'react';
import "./_pill.scss";
import Plus from "@assets/icons/plus.svg?react";

interface PillProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Pill: React.FC<PillProps> = ({ onClick, children, icon }) => {
  if (onClick) {
    return (
      <button onClick={onClick} className="pill">
        {icon && <span className="pill-icon">{icon}</span>}
        <span className="pill-label">{children}</span>
        <span className="pill-plus"><Plus/></span>
      </button>
    );
  }
  
  return (
    <div className="pill">
      {icon && <span className="pill-icon">{icon}</span>}
      <span className="pill-label">{children}</span>
    </div>
  );
};

export default Pill;
