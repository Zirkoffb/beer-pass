
import React from 'react';

interface AmountToggleProps {
  options: string[];
  activeValue: string;
  onToggle: (value: string) => void;
}

export const AmountToggle: React.FC<AmountToggleProps> = ({ options, activeValue, onToggle }) => {
  return (
    <div className="flex items-center bg-slate-100 rounded-xl p-1">
      {options.map((option, index) => {
        const isActive = option === activeValue;
        return (
          <button
            key={index}
            onClick={() => onToggle(option)}
            className={`px-6 py-2 w-24 text-center rounded-lg font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-white text-slate-800 shadow-sm'
                : 'bg-transparent text-slate-500'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
