
import React from 'react';
import { ChevronDownIcon, SearchIcon, XIcon, RefreshIcon } from '../constants';

interface InputGroupProps {
  label?: string;
  caption?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, caption, children }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
    {children}
    {caption && <p className="mt-1 text-sm text-slate-500">{caption}</p>}
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  caption?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, caption, leftIcon, rightIcon, className, ...props }) => {
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  return (
    <InputGroup label={label} caption={caption}>
      <div className="relative">
        {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{leftIcon}</div>}
        <input
          className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition duration-200 ${hasLeftIcon ? 'pl-10' : ''} ${hasRightIcon ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightIcon}</div>}
      </div>
    </InputGroup>
  );
};


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  caption?: string;
}

export const Select: React.FC<SelectProps> = ({ label, caption, children, ...props }) => {
  return (
    <InputGroup label={label} caption={caption}>
      <div className="relative">
        <select
          className="w-full appearance-none bg-white px-4 py-3 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition duration-200"
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-slate-400" />
        </div>
      </div>
    </InputGroup>
  );
};

export const SearchInput: React.FC = () => {
    return (
        <Input
            leftIcon={<SearchIcon className="w-5 h-5 text-slate-400" />}
            rightIcon={<XIcon className="w-5 h-5 text-slate-400 cursor-pointer" />}
            placeholder="Bank"
        />
    );
};


interface CurrencyInputProps {
    label: string;
    placeholder: string;
    showRefresh?: boolean;
}
export const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, placeholder, showRefresh = false }) => {
    return (
        <InputGroup label={label}>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-l-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition duration-200"
                />
                <div className="flex items-center bg-white border-y border-r border-slate-200 rounded-r-xl h-[50px] px-4">
                    <span className="text-slate-500 font-semibold mr-2">USD</span>
                    {showRefresh ? 
                        <RefreshIcon className="w-5 h-5 text-slate-400 cursor-pointer"/> :
                        <ChevronDownIcon className="w-5 h-5 text-slate-400 cursor-pointer"/>
                    }
                </div>
            </div>
        </InputGroup>
    );
}
