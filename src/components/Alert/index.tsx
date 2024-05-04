import React from 'react';
import "./style.scss";

interface AlertProps {
  children: React.ReactNode;
  type: 'success' | 'warning' | 'info' | 'error';
}

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  return (
    <div className="alert" data-type={type}>
      <span className="alert-label">{children}</span>
    </div>
  );
};

export default Alert;
