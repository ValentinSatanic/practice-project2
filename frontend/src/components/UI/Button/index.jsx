import React from 'react';
import s from './Button.module.css';

const Button = ({ children, type = 'primary', onClick, className, disabled = false }) => {
  const buttonClass = `${s.button} ${s[type]} ${className || ''}`;
  return (
    <button 
      className={buttonClass} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;