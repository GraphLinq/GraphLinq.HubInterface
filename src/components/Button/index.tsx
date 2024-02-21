import React from 'react';
import { Link } from 'react-router-dom';
import "./_button.scss";

interface ButtonProps {
  link?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ link, onClick, children, icon }) => {
  if (link) {
    return (
      <Link to={link} className="button">
        {icon && <span className="button-icon">{icon}</span>}
        <span className="button-label">{children}</span>
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className="button">
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-label">{children}</span>
    </button>
  );
};

export default Button;
