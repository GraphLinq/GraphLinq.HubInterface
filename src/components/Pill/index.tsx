import Plus from "@assets/icons/plus.svg?react";
import React from 'react';

import "./style.scss";


interface PillProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  add?: boolean;
  [key: string]: any;
}

const Pill: React.FC<PillProps> = ({ onClick, children, icon, add, ...props }) => {
  if (onClick) {
    return (
      <button onClick={onClick} className="pill" data-focus {...props}>
        {icon && <span className="pill-icon">{icon}</span>}
        <span className="pill-label">{children}</span>
        {add && <span className="pill-plus"><Plus/></span>}
      </button>
    );
  }
  
  return (
    <div className="pill" {...props}>
      {icon && <span className="pill-icon">{icon}</span>}
      <span className="pill-label">{children}</span>
    </div>
  );
};

export default Pill;
