import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

interface ButtonProps {
  link?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  target?: string;
  type?: "secondary" | "tertiary";
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  link,
  onClick,
  children,
  icon,
  disabled,
  target,
  type,
  ...props
}) => {
  if (link) {
    return (
      <Link
        to={link}
        target={target}
        className="button"
        data-disabled={disabled}
        data-type={type}
        {...props}
      >
        {icon && <span className="button-icon">{icon}</span>}
        <span className="button-label">{children}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className="button"
      data-disabled={disabled}
      data-type={type}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-label">{children}</span>
    </button>
  );
};

export default Button;
