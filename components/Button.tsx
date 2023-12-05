import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Confetti from "react-dom-confetti";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(
        `
        w-full
        px-3
        py-3
        rounded-full
        bg-red
        bg-rose-500
        hover:bg-rose-600
        disabled:cursor-not-allowed
        disabled:opacity-50
        transition-transform
        transform
        `,
        disabled && 'opacity-75 cursor-not-allowed',
        'hover-pulsate hover-shrink', // Apply the custom classes for effects
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
