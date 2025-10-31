import React, { useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  success?: boolean;
  floatingLabel?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon,
    rightIcon,
    success = false,
    floatingLabel = true,
    className = '', 
    id, 
    value,
    placeholder,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');
    
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasValue = (value !== undefined ? value : internalValue) !== '';
    const isLabelFloating = floatingLabel && (isFocused || hasValue);
    
    const containerStyles = 'relative w-full';
    
    const inputStyles = `
      w-full px-4 py-3 border-2 rounded-lg text-gray-900
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400
      transition-all duration-300
      placeholder:text-gray-400
      ${floatingLabel ? 'pt-6 pb-2' : ''}
      ${leftIcon ? 'pl-11' : ''}
      ${rightIcon || success ? 'pr-11' : ''}
      ${hasError 
        ? 'border-error-500 focus:ring-error-500 focus:border-error-600 bg-error-50 animate-shake text-gray-900' 
        : success
        ? 'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-600 bg-emerald-50 text-gray-900'
        : 'border-neutral-300 focus:ring-saffron-500 focus:border-saffron-500 hover:border-neutral-400 bg-white'
      }
      ${className}
    `;
    
    const labelStyles = `
      absolute left-4 transition-all duration-300 pointer-events-none
      ${leftIcon ? 'left-11' : 'left-4'}
      ${floatingLabel && isLabelFloating
        ? 'top-1.5 text-xs font-medium text-saffron-600'
        : floatingLabel
        ? 'top-3.5 text-base text-neutral-500'
        : 'relative block text-sm font-medium text-neutral-700 mb-2 pointer-events-auto'
      }
      ${hasError && floatingLabel && isLabelFloating ? 'text-error-600' : ''}
      ${success && floatingLabel && isLabelFloating ? 'text-emerald-600' : ''}
    `;
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      props.onChange?.(e);
    };
    
    return (
      <div className="w-full">
        <div className={containerStyles}>
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <span className="flex items-center justify-center h-5 w-5">
                {leftIcon}
              </span>
            </div>
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            className={inputStyles}
            value={value}
            placeholder={floatingLabel ? '' : placeholder}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {/* Floating Label */}
          {label && (
            <label 
              htmlFor={inputId} 
              className={labelStyles}
            >
              {label}
              {props.required && <span className="text-error-500 ml-1" aria-label="required">*</span>}
            </label>
          )}
          
          {/* Right Icon or Success Checkmark */}
          {(rightIcon || success) && (
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${success ? 'text-emerald-500' : 'text-neutral-400'}`}>
              <span className="flex items-center justify-center h-5 w-5">
                {success ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                ) : (
                  rightIcon
                )}
              </span>
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-error-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {/* Helper Text */}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
