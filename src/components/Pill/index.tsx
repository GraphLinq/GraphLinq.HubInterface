import React from 'react';
import "./_pill.scss";
import Plus from "@assets/icons/plus.svg?react";

interface PillProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  add?: boolean;
}

const Pill: React.FC<PillProps> = ({ onClick, children, icon, add }) => {
  if (onClick) {
    return (
      <button onClick={onClick} className="pill" data-focus>
        {icon && <span className="pill-icon">{icon}</span>}
        <span className="pill-label">{children}</span>
        {add && <span className="pill-plus"><Plus/></span>}
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
