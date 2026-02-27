'use client';

import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({
    label,
    error,
    type = 'text',
    disabled = false,
    icon: Icon = null,
    className = '',
    helperText = '',
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = showPassword ? 'text' : type;

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                    {props.required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3 text-gray-400 dark:text-gray-600 pointer-events-none">
                        <Icon size={18} />
                    </div>
                )}

                <input
                    type={inputType}
                    disabled={disabled}
                    className={`
            w-full px-3 py-2 border rounded-lg font-inter
            focus:outline-none focus:ring-2 focus:ring-offset-0
            transition-colors duration-200
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${error
                            ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                        }
            ${className}
          `}
                    {...props}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>}
            {helperText && !error && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{helperText}</p>
            )}
        </div>
    );
}
