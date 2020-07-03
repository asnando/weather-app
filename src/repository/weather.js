import {OPENWEATHER_APP_ID} from 'react-native-dotenv';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  OPENWEATHER_API_BASE_URL,
  OPENWEATHER_ICON_BASE_URL,
  OPENWEATHER_LANG,
  OPENWEATHER_UNITS_TYPE,
  MOMENTJS_LANG,
} from '../constants';
import {WeatherBuilder} from './type/weather';
import {encodeUrlWithParams} from '../utils/url';
import {toCelsius, toPercent, toSpeed} from '../utils/conversion';
import {replaceVarInString, capitalize} from '../utils/string';

// Transforma a resposta da Openweather API para um objeto
// do tipo Weather, para ser mais facilmente manipulado
// pelos componentes que exibem suas informações.
function parseWeatherResponseToWeatherObject(response) {
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

  // atualiza momentjs para tratar data como portguês Brasil
  moment.locale(MOMENTJS_LANG);

  const date = moment(dateTimestamp);

  // Como não está sendo utilizado typescript e para garantir uma melhor
  // interface entre o tipo de dado e a apresentação, criei uma classe com
  // seu respectivo builder para facilitar a apresentação das propriedades
  // dentro dos components que recebem este objeto(Weather).
  return new WeatherBuilder()
    .city(city)
    .date(capitalize(date.format('dddd, D')))
    .description(capitalize(description))
    .humidity(toPercent(humidity))
    .temperature(toCelsius(temperature))
    .maxTemperature(toCelsius(maxTemperature))
    .minTemperature(toCelsius(minTemperature))
    .windSpeed(toSpeed(windSpeed))
    .icon(
      replaceVarInString(OPENWEATHER_ICON_BASE_URL, 'iconName', weatherIcon),
    )
    .build();
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
