import {OPENWEATHER_APP_ID} from 'react-native-dotenv';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  OPENWEATHER_API_BASE_URL,
  OPENWEATHER_ICON_BASE_URL,
  OPENWEATHER_LANG,
  OPENWEATHER_UNITS_TYPE,
} from '../constants';
import {encodeUrlWithParams} from '../utils/url';

function parseWeatherResponseToWeatherObject(response) {
  console.log(response);
  const {
    name: city,
    dt: dateTimestamp,
    main: {
      temp: temperature,
      temp_max: maxTemperature,
      temp_min: minTemperature,
      humidity,
    },
    weather,
    wind,
  } = response;
  const [weatherMatch] = weather;
  const {description, icon: weatherIcon} = weatherMatch;
  const {speed: windSpeed} = wind;
  const weatherIconUrl = OPENWEATHER_ICON_BASE_URL.replace(/\$iconName/i, weatherIcon);
  moment.locale('pt-br');
  const date = moment(dateTimestamp);

  const toCelsius = (temp) => {
    // eslint-disable-next-line radix
    temp = parseInt(temp);
    if (temp > 0) {
      return `+${temp}º`;
    }
    if (temp < 0) {
      return `-${temp}º`;
    }
    return `${temp}º`;
  };

  return {
    city,
    // dateAsString: `${date.getDay()}`,
    dateAsString: date.format('dddd, D').replace(/(^\w)|(-\w)/gi, (match) => match.toUpperCase()),
    description: description.replace(/(^\w)|\s(\w)/gi, (match) =>
      match.toUpperCase(),
    ),
    humidity: `${humidity}%`,
    temperature: toCelsius(temperature),
    maxTemperature: toCelsius(maxTemperature),
    minTemperature: toCelsius(minTemperature),
    // eslint-disable-next-line radix
    windSpeed: `${parseInt(windSpeed)} m/s`,
    icon: weatherIconUrl,
  };
}

export async function getCurrentWeatherByCoordinates(lat = 0, lon = 0) {
  const url = encodeUrlWithParams(`${OPENWEATHER_API_BASE_URL}/weather`, {
    appid: OPENWEATHER_APP_ID,
    lat,
    lon,
    lang: OPENWEATHER_LANG,
    units: OPENWEATHER_UNITS_TYPE,
  });
  console.log(url);
  return fetch(url)
    .then((response) => response.json())
    .then((response) => parseWeatherResponseToWeatherObject(response));
}
