import React from 'react';
import { Link } from 'react-router-dom';
import "./_button.scss";

interface ButtonProps {
  link?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  target?: string;
}

const Button: React.FC<ButtonProps> = ({ link, onClick, children, icon, disabled, target }) => {
  if (link) {
    return (
      <Link to={link} target={target} className="button" data-disabled={disabled}>
        {icon && <span className="button-icon">{icon}</span>}
        <span className="button-label">{children}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="button" data-disabled={disabled}>
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-label">{children}</span>
    </button>
  );
};

export default Button;
