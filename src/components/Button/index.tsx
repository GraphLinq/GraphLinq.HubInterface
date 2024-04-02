import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";

interface ButtonProps {
  link?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  target?: string;
  type?: 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ link, onClick, children, icon, disabled, target, type }) => {
  if (link) {
    return (
      <Link to={link} target={target} className="button" data-disabled={disabled} data-type={type}>
        {icon && <span className="button-icon">{icon}</span>}
        <span className="button-label">{children}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="button" data-disabled={disabled} data-type={type}>
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-label">{children}</span>
    </button>
  );
};

export default Button;
