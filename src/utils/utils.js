export const roundOf = (n, p) => {
  const n1 = n * Math.pow(10, p + 1);
  const n2 = Math.floor(n1 / 10);
  if (n1 >= n2 * 10 + 5) {
    return (n2 + 1) / Math.pow(10, p);
  }
  return n2 / Math.pow(10, p);
};

// From: http://snowfence.umn.edu/Components/winddirectionanddegrees.htm
export const windDirection = (deg) => {
  if (deg > 11.25 && deg < 33.75) {
    return "NNE";
  } else if (deg > 33.75 && deg < 56.25) {
    return "ENE";
  } else if (deg > 56.25 && deg < 78.75) {
    return "E";
  } else if (deg > 78.75 && deg < 101.25) {
    return "ESE";
  } else if (deg > 101.25 && deg < 123.75) {
    return "ESE";
  } else if (deg > 123.75 && deg < 146.25) {
    return "SE";
  } else if (deg > 146.25 && deg < 168.75) {
    return "SSE";
  } else if (deg > 168.75 && deg < 191.25) {
    return "S";
  } else if (deg > 191.25 && deg < 213.75) {
    return "SSW";
  } else if (deg > 213.75 && deg < 236.25) {
    return "SW";
  } else if (deg > 236.25 && deg < 258.75) {
    return "WSW";
  } else if (deg > 258.75 && deg < 281.25) {
    return "W";
  } else if (deg > 281.25 && deg < 303.75) {
    return "WNW";
  } else if (deg > 303.75 && deg < 326.25) {
    return "NW";
  } else if (deg > 326.25 && deg < 348.75) {
    return "NNW";
  } else {
    return "N";
  }
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = "0" + date.getMinutes();
  const suffix = date.getHours() < 12 ? "AM" : "PM";

  return hours + ":" + minutes.substr(-2) + " " + suffix;
};

export const compareTime = (a, b) => {
  const x = new Date(a * 1000);
  const y = new Date(b * 1000);
  let operator = "";

  if (x.getMinutes() > y.getMinutes()) {
    operator = "+";
  } else if (x.getMinutes() === y.getMinutes()) {
    if (x.getSeconds() > y.getSeconds()) {
      operator = "+";
    } else {
      operator = "-";
    }
  } else {
    operator = "";
  }

  const minutes = "" + (x.getMinutes() - y.getMinutes());
  var seconds = "0" + (x.getSeconds() - y.getSeconds());

  return operator + minutes.substr(-2) + "m " + seconds.substr(-2) + "s";
};

export const humidityLevels = (temp, humidity) => {
  console.log("humidityLevels", temp, humidity);
  if (temp >= 50 && humidity > 50) {
    return "High";
  } else if (temp >= 20 && humidity > 40) {
    return "High";
  } else if (temp >= 10 && temp < 20 && humidity > 35) {
    return "High";
  } else if (temp >= 0 && temp < 10 && humidity > 30) {
    return "High";
  } else if (temp >= -10 && temp < 0 && humidity > 25) {
    return "High";
  } else if (temp >= -20 && temp < -10 && humidity > 20) {
    return "High";
  } else if (temp <= 20 && humidity > 15) {
    return "High";
  } else {
    return "Normal";
  }
};
