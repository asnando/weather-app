export class Weather {
  constructor() {
    Object.assign(this, {
      city: '',
      date: '',
      description: '',
      humidity: '',
      temperature: '',
      maxTemperature: '',
      minTemperature: '',
      windSpeed: '',
      icon: '',
    });
  }
  setCity(city) {
    this.city = city;
  }
  setDate(date) {
    this.date = date;
  }
  setDescription(description) {
    this.description = description;
  }
  setHumidity(humidity) {
    this.humidity = humidity;
  }
  setTemperature(temperature) {
    this.temperature = temperature;
  }
  setMaxTemperature(maxTemperature) {
    this.maxTemperature = maxTemperature;
  }
  setMinTemperature(minTemperature) {
    this.minTemperature = minTemperature;
  }
  setWindSpeed(windSpeed) {
    this.windSpeed = windSpeed;
  }
  setIcon(icon) {
    this.icon = icon;
  }
  getCity() {
    return this.city;
  }
  getDate() {
    return this.date;
  }
  getDescription() {
    return this.description;
  }
  getHumidity() {
    return this.humidity;
  }
  getTemperature() {
    return this.temperature;
  }
  getMaxTemperature() {
    return this.maxTemperature;
  }
  getMinTemperature() {
    return this.minTemperature;
  }
  getWindSpeed() {
    return this.windSpeed;
  }
  getIcon() {
    return this.icon;
  }
}

export class WeatherBuilder {
  constructor() {
    this.weather = new Weather();
  }
  city(city) {
    this.weather.setCity(city);
    return this;
  }
  date(date) {
    this.weather.setDate(date);
    return this;
  }
  description(description) {
    this.weather.setDescription(description);
    return this;
  }
  humidity(humidity) {
    this.weather.setHumidity(humidity);
    return this;
  }
  temperature(temperature) {
    this.weather.setTemperature(temperature);
    return this;
  }
  maxTemperature(maxTemperature) {
    this.weather.setMaxTemperature(maxTemperature);
    return this;
  }
  minTemperature(minTemperature) {
    this.weather.setMinTemperature(minTemperature);
    return this;
  }
  windSpeed(windSpeed) {
    this.weather.setWindSpeed(windSpeed);
    return this;
  }
  icon(icon) {
    this.weather.setIcon(icon);
    return this;
  }
  build() {
    return this.weather;
  }
}
