import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    
    const selectStyles = `
      w-full px-3 py-2 border rounded-lg text-gray-900
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
      transition-all duration-200 bg-white
      hover:border-gray-400
      ${hasError 
        ? 'border-error-500 focus:ring-error-500 focus:border-error-500 bg-error-50 text-gray-900' 
        : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
      }
      ${className}
    `;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={selectStyles}
          aria-invalid={hasError}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-error">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${selectId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
