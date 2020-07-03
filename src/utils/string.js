export function replaceVarInString(str, varName, value) {
  return str.replace(new RegExp(`\\$${varName}`), value);
}

export function capitalize(str) {
  return str.replace(/(^\w)|\s(\w)|(-\w)/gi, (match) => match.toUpperCase());
}
