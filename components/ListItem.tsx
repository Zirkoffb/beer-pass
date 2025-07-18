
import React from 'react';
import { MapPinIcon, ChevronRightIcon, WaterDropIcon, CameraIcon, CheckIcon, VietnameseFlagIcon, BankIcon } from '../constants';

const ListItemWrapper: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`flex items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full ${className}`}>
        {children}
    </div>
);

export const LocationListItem: React.FC = () => (
    <ListItemWrapper>
        <MapPinIcon className="w-6 h-6 text-slate-500 mr-4" />
        <span className="flex-grow font-semibold text-slate-800">1656 Union Street</span>
        <span className="text-slate-500 text-sm">50m</span>
    </ListItemWrapper>
);

export const PasswordListItem: React.FC = () => (
    <ListItemWrapper>
        <img src="https://picsum.photos/id/40/100/100" alt="user avatar" className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-grow">
            <p className="font-semibold text-slate-800">Password</p>
            <p className="text-sm text-slate-500">+278980890</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-slate-400" />
    </ListItemWrapper>
);

interface TransactionListItemProps {
    type: 'income' | 'expense';
    title: string;
    amount: number;
    status?: string;
    date?: string;
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({ type, title, amount, status, date }) => {
    const isExpense = type === 'expense';
    const amountColor = isExpense ? 'text-red-500' : 'text-green-500';
    const icon = title.includes('Water') ? <WaterDropIcon className="w-6 h-6 text-white"/> : <CameraIcon className="w-6 h-6 text-white"/>;
    const iconBg = isExpense ? 'bg-red-400' : 'bg-blue-400';

    return (
        <ListItemWrapper>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${iconBg}`}>
                {icon}
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-slate-800">{title}</p>
                <p className="text-sm text-slate-500">{status || date}</p>
            </div>
            <p className={`font-bold text-lg ${amountColor}`}>
                {isExpense ? '- ' : '+ '}${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(amount))}
            </p>
        </ListItemWrapper>
    );
};

interface LanguageListItemProps {
    name: string;
    isSelected: boolean;
}

export const LanguageListItem: React.FC<LanguageListItemProps> = ({ name, isSelected }) => (
    <ListItemWrapper>
        <VietnameseFlagIcon className="w-10 h-10 mr-4" />
        <p className="flex-grow font-semibold text-slate-800">{name}</p>
        {isSelected && <CheckIcon className="w-6 h-6 text-violet-600" />}
    </ListItemWrapper>
);

export const BankListItem: React.FC = () => (
    <ListItemWrapper>
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-violet-100">
            <BankIcon className="w-6 h-6 text-violet-600"/>
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-slate-800">Bank of America</p>
            <p className="text-sm text-slate-500">Bank of America: 256486 is the ou...</p>
        </div>
        <span className="text-sm text-slate-500">Today</span>
    </ListItemWrapper>
);
