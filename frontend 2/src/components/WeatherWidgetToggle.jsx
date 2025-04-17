import { SunIcon, CloudIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function WeatherWidgetToggle({ condition = "Sunny", onClick }) {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case "sunny": return <SunIcon className="h-6 w-6 text-yellow-400" />;
      case "cloudy": return <CloudIcon className="h-6 w-6 text-blue-400" />;
      case "night": return <MoonIcon className="h-6 w-6 text-indigo-400" />;
      default: return <SunIcon className="h-6 w-6 text-yellow-400" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className="fixed top-20 right-4 z-50 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-full shadow-lg p-3 flex items-center justify-center hover:scale-105 transition"
      aria-label="Show weather widget"
    >
      {getIcon()}
    </button>
  );
}
