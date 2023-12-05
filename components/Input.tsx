import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setIsFilled(event.target.value.length > 0);

  return (
    <div className="relative mb-4">
      <input
        type={type}
        className={twMerge(`
          flex
          w-full
          rounded-md
          bg-neutral-700
          border
          px-4
          py-2
          text-sm
          text-green-100
          focus:outline-none
          focus:ring-2
          focus:ring-primary-500
          focus:border-transparent
          transition-all
          duration-300
          ease-in-out
          hover:border-primary-500
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          placeholder:text-neutral-400
        `, className,
        isFocused || isFilled ? 'border-green-500' : '', className)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      {isFilled && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
