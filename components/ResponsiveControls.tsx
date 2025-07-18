import React from 'react';
import { SmartphoneIcon, TabletIcon, DesktopIcon } from '../constants';

export type DeviceView = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveControlsProps {
  currentView: DeviceView;
  setView: (view: DeviceView) => void;
}

export const ResponsiveControls: React.FC<ResponsiveControlsProps> = ({ currentView, setView }) => {
  const controls: { view: DeviceView, icon: React.ReactNode, title: string }[] = [
    { view: 'mobile', icon: <SmartphoneIcon className="w-5 h-5 sm:w-6 sm:h-6" />, title: 'Visualização Móvel' },
    { view: 'tablet', icon: <TabletIcon className="w-5 h-5 sm:w-6 sm:h-6" />, title: 'Visualização Tablet' },
    { view: 'desktop', icon: <DesktopIcon className="w-5 h-5 sm:w-6 sm:h-6" />, title: 'Visualização Desktop' },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-gray-900/70 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg mb-4 border border-gray-700 z-50">
      {controls.map(({ view, icon, title }) => {
        const isActive = currentView === view;
        return (
          <button
            key={view}
            onClick={() => setView(view)}
            title={title}
            aria-label={title}
            className={`p-2 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-amber-500 text-gray-900 shadow-md' 
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};
