
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseClasses = "px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: 'bg-amber-500 text-gray-900 hover:bg-amber-600 focus:ring-amber-400 shadow-md',
    secondary: 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50 focus:ring-amber-500',
    danger: 'bg-transparent text-red-500 hover:bg-red-50 focus:ring-red-500',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-700 focus:ring-slate-500',
    link: 'bg-transparent text-amber-500 hover:underline p-0',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const IconButton: React.FC<IconButtonProps> = ({ variant = 'secondary', className = '', children, ...props }) => {
  const baseClasses = "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: 'bg-amber-500 text-gray-900 hover:bg-amber-600 focus:ring-amber-400',
    secondary: 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600 focus:ring-gray-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
