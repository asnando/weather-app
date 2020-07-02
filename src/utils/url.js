export function encodeUrlWithParams(url, params = {}) {
  return `${url}?` + Object.keys(params).map((keyName) => (
    `${keyName}=${params[keyName]}`
  )).join('&');
}
