// Gets icon name according to weather-icon component
const getIconName = (icon) => {
  let iconName = '';
  switch (icon) {
    case 'rain':
      iconName = 'raindrop';
      break;
    case 'clear-day':
      iconName = 'day-sunny';
      break;
    case 'clear-night':
      iconName = 'night-clear';
      break;
    case 'wind':
      iconName = 'windy';
      break;
    case 'partly-cloudy-day':
      iconName = 'day-cloudy';
      break;
    case 'partly-cloudy-night':
      iconName = 'night-alt-cloudy';
      break;
    case 'thunderstorm':
      iconName = 'lightning';
      break;
    default:
      iconName = icon;
      break;
  }
  return iconName;
};

// Exporting object with method
export default {
  getIconName,
};
