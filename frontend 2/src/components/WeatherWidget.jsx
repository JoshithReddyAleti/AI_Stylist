import { useState } from 'react';
import { 
  SunIcon, 
  XMarkIcon
} from '@heroicons/react/24/solid';

// Weather data is hardcoded in the component for simplicity

export default function WeatherWidget({ visible, onClose }) {
  if (!visible) return null;



  return (
    <div className="fixed top-20 right-4 z-50 w-64">
      <div className="relative bg-white dark:bg-navy-800 rounded-xl shadow-lg border border-gray-200 dark:border-navy-700 p-4">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-100 dark:bg-navy-700 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-navy-600"
            aria-label="Hide weather widget"
          >
            <XMarkIcon className="h-4 w-4 text-gray-500" />
          </button>
        )}
        {/* Weather Content Restored */}
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <SunIcon className="h-8 w-8 text-yellow-400 mr-2" />
            <span className="text-2xl font-bold text-navy-900 dark:text-white">72°F</span>
          </div>
          <div className="text-lg text-navy-700 dark:text-navy-200 mb-1">Sunny</div>
          <div className="text-sm text-navy-500 dark:text-navy-400">New York, NY</div>
        </div>
      </div>
    </div>
  );
}
