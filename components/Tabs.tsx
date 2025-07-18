
import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-4">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
