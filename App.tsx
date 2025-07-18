
import React, { useState } from 'react';
import { BeerPassApp } from './components/BeerPassApp';
import { ResponsiveControls, DeviceView } from './components/ResponsiveControls';

const App: React.FC = () => {
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  const viewDimensions = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '100%' },
  };

  const currentDimensions = viewDimensions[deviceView];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-0 sm:p-4">
      <ResponsiveControls currentView={deviceView} setView={setDeviceView} />
      <div
        className="relative w-full h-full bg-gray-900 sm:rounded-lg shadow-2xl overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxWidth: currentDimensions.width, maxHeight: currentDimensions.height }}
      >
        <BeerPassApp />
      </div>
    </div>
  );
};

export default App;
