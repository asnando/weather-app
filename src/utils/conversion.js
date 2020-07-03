export function toCelsius(temp) {
  // eslint-disable-next-line radix
  temp = parseInt(temp);
  if (temp > 0) {
    return `+${temp}º`;
  }
  if (temp < 0) {
    return `-${temp}º`;
  }
  return `${temp}º`;
}

export function toPercent(value) {
  return `${value}%`;
}

export function toSpeed(value) {
  // eslint-disable-next-line radix
  return `${parseInt(value)} m/s`;
}
