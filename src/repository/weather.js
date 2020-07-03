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

  const date = moment(dateTimestamp * 1000);

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

function parseForecastResponseToWeatherList(forecast = []) {
  return forecast.map(parseWeatherResponseToWeatherObject);
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

function findIndexOfFirstForecastWithSameDate(list = [], date) {
  return list.findIndex((forecast) => forecast.getDate() === date);
}

export async function getWeatherForecast(lat = 0, lon = 0) {
  const url = encodeUrlWithParams(`${OPENWEATHER_API_BASE_URL}/forecast`, {
    appid: OPENWEATHER_APP_ID,
    lat,
    lon,
    lang: OPENWEATHER_LANG,
    units: OPENWEATHER_UNITS_TYPE,
  });
  console.log(url);
  // A previsão dos próximos dias irá retornar diversas horas de cada dia.
  // Aqui nós trazemos apenas a primeira resolução para cada dia, a fim de 
  // termos apenas 5 dias na lista.
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.list)
    .then((response) => parseForecastResponseToWeatherList(response))
    .then((forecast) => forecast
      .filter((weatherForecast, index, self) => (
        findIndexOfFirstForecastWithSameDate(self, weatherForecast.getDate()) === index
      )
    ));
}
