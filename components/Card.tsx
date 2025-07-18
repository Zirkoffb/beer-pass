
import React from 'react';

interface ActionCardProps {
  icon: React.ReactNode;
  text?: string;
  variant?: 'default' | 'primary';
}

export const ActionCard: React.FC<ActionCardProps> = ({ icon, text, variant = 'default' }) => {
  const baseClasses = "flex flex-col items-center justify-center p-4 rounded-2xl shadow-md border transition-transform transform hover:-translate-y-1";
  const variantClasses = {
    default: 'bg-white border-slate-100',
    primary: 'bg-violet-600 text-white border-violet-700'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="mb-2">{icon}</div>
      {text && <p className="font-semibold text-center">{text}</p>}
    </div>
  );
};

interface UserCardProps {
  name: string;
  avatarUrl: string;
}

export const UserCard: React.FC<UserCardProps> = ({ name, avatarUrl }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-md border border-slate-100 transition-transform transform hover:-translate-y-1">
    <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-full mb-3" />
    <p className="font-semibold">{name}</p>
  </div>
);

const BillRow: React.FC<{label: string; value: string | number; isTotal?: boolean}> = ({ label, value, isTotal = false }) => (
    <div className={`flex justify-between items-center ${isTotal ? 'font-bold text-lg mt-4 pt-4 border-t border-slate-200' : 'text-sm mb-2'}`}>
        <p className={isTotal ? 'text-slate-800' : 'text-slate-500'}>{label}</p>
        <p className={isTotal ? 'text-red-500' : 'text-slate-800 font-semibold'}>{
            typeof value === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) : value
        }</p>
    </div>
);

export const BillDetailsCard: React.FC = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 w-full">
        <h3 className="font-bold text-xl mb-6 text-slate-900">All the Bills</h3>
        <div className="space-y-3">
            <BillRow label="Name" value="Jackson Maine" />
            <BillRow label="Address" value="403 East 4th Street, Santa Ana" />
            <BillRow label="Phone number" value="+84234589721" />
            <BillRow label="Code" value="#2343543" />
            <BillRow label="From" value="01/10/2019" />
            <BillRow label="To" value="01/11/2019" />
            <BillRow label="Electric fee" value={470} />
            <BillRow label="Tax" value={10} />
        </div>
        <BillRow label="TOTAL" value={480} isTotal />
    </div>
);

export const Avatar: React.FC<{src: string, alt: string, className?: string}> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={`w-16 h-16 rounded-full object-cover shadow-md border-2 border-white ${className}`} />
);

export const AddNewCardButton: React.FC = () => (
    <button className="w-full flex items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 hover:bg-slate-100 hover:border-slate-400 transition-colors duration-300 h-full">
        <span className="font-semibold">Add new card</span>
    </button>
);

const ChartBar: React.FC<{ topValue: number; bottomValue: number }> = ({ topValue, bottomValue }) => (
    <div className="h-24 flex flex-col-reverse">
        <div style={{ height: `${bottomValue}%` }} className="w-2 bg-pink-300 rounded-b-sm"></div>
        <div style={{ height: `${topValue}%` }} className="w-2 bg-violet-400 rounded-t-sm"></div>
    </div>
);

export const BalanceChartCard: React.FC = () => {
    const data = [
        { top: 25, bottom: 15 },
        { top: 40, bottom: 25 },
        { top: 20, bottom: 10 },
        { top: 60, bottom: 30 }, // April (current)
        { top: 30, bottom: 15 },
        { top: 35, bottom: 20 },
    ];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 w-full">
            <p className="text-slate-500">Balance</p>
            <div className="flex items-end gap-1 my-2">
                <p className="text-4xl font-bold text-slate-800">1000</p>
                <p className="text-slate-500 font-semibold">USD</p>
            </div>
            <div className="flex justify-between items-end h-28 pt-4">
                {data.map((d, i) => (
                    <div key={months[i]} className="flex flex-col items-center gap-2">
                        <ChartBar topValue={d.top} bottomValue={d.bottom} />
                        <p className={`text-sm font-semibold ${months[i] === 'Apr' ? 'text-violet-600' : 'text-slate-400'}`}>{months[i]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const VisaLogo: React.FC<{className?: string}> = ({className}) => (
    <span className={`font-bold italic text-2xl text-white/90 select-none ${className}`} style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>VISA</span>
);

type CreditCardVariant = 'gold' | 'blue' | 'dark';
interface CreditCardProps {
    variant: CreditCardVariant;
    name: string;
    cardType: string;
    cardNumber: string;
    balance: number;
}

export const CreditCard: React.FC<CreditCardProps> = ({ variant, name, cardType, cardNumber, balance }) => {
  const variants = {
    gold: 'bg-gradient-to-br from-yellow-300 to-orange-400',
    blue: 'bg-cyan-400',
    dark: 'bg-slate-800'
  };

  const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);

  return (
    <div className={`p-5 rounded-2xl text-white flex flex-col justify-between h-52 shadow-lg relative overflow-hidden ${variants[variant]}`}>
      {/* Background elements */}
      {variant === 'blue' && (
        <div className="absolute -bottom-12 -left-1/3 w-[150%] h-[150%] bg-blue-600 rounded-full transform rotate-12"></div>
      )}
      {variant === 'gold' && (
        <>
          <div className="absolute top-1/2 right-20 w-20 h-20 bg-white/20 rounded-full transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-12 w-6 h-6 bg-white/20 rounded-full transform -translate-y-1/2"></div>
        </>
      )}
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="font-semibold text-md">{name}</p>
          <p className="text-xs opacity-80">{cardType}</p>
        </div>
      </div>
      
      <div className="relative z-10">
        <p className="font-semibold text-xl">{formattedBalance}</p>
        <p className="font-mono text-sm tracking-widest mt-1 opacity-90">{cardNumber}</p>
      </div>

      <div className="relative z-10 flex justify-end items-center">
        {variant !== 'gold' && <VisaLogo />}
      </div>
       {variant === 'dark' && (
          <div className="absolute bottom-4 left-0 right-0 h-5 bg-red-500/80 transform skew-y-[-4deg]"></div>
      )}
    </div>
  );
};
