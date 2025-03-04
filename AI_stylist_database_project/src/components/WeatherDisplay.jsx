function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;
  
  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };
  
  const getWeatherClass = (condition) => {
    const classes = {
      cold: 'weather-cold',
      cool: 'weather-cool',
      mild: 'weather-mild',
      warm: 'weather-warm',
      hot: 'weather-hot'
    };
    
    return classes[condition] || 'weather-mild';
  };
  
  return (
    <div className={`weather-display ${getWeatherClass(weatherData.weatherCondition)}`}>
      <h2>Current Weather in {weatherData.location}</h2>
      <div className="weather-info">
        <div className="weather-icon">
          <img src={getWeatherIcon(weatherData.icon)} alt={weatherData.description} />
        </div>
        <div className="weather-details">
          <div className="temperature">{Math.round(weatherData.temperature)}°C</div>
          <div className="description">{weatherData.description}</div>
          <div className="extra-info">
            <span>Humidity: {weatherData.humidity}%</span>
            <span>Wind: {weatherData.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;