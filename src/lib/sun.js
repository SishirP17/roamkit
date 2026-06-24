// Offline sunrise/sunset calculation (Almanac for Computers algorithm).
// Given a date + latitude/longitude, returns a JS Date (UTC) for the event,
// or null when the sun doesn't rise/set that day (polar regions).
// Pure math — no internet, no library.

const RAD = Math.PI / 180;
const sin = (d) => Math.sin(d * RAD);
const cos = (d) => Math.cos(d * RAD);
const tan = (d) => Math.tan(d * RAD);
const asin = (x) => Math.asin(x) / RAD;
const acos = (x) => Math.acos(x) / RAD;
const atan = (x) => Math.atan(x) / RAD;
const norm = (v, max) => ((v % max) + max) % max;

// zenith: 90.833 official sunrise/sunset, 96 civil twilight.
// rising: true for sunrise/dawn, false for sunset/dusk.
function calc(date, lat, lng, zenith, rising) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const N = Math.floor(diff / 86400000); // day of year

  const lngHour = lng / 15;
  const t = N + ((rising ? 6 : 18) - lngHour) / 24;

  const M = 0.9856 * t - 3.289; // mean anomaly
  let L = M + 1.916 * sin(M) + 0.020 * sin(2 * M) + 282.634; // true longitude
  L = norm(L, 360);

  let RA = atan(0.91764 * tan(L)); // right ascension
  RA = norm(RA, 360);
  // put RA in same quadrant as L
  const Lquad = Math.floor(L / 90) * 90;
  const RAquad = Math.floor(RA / 90) * 90;
  RA = (RA + (Lquad - RAquad)) / 15;

  const sinDec = 0.39782 * sin(L);
  const cosDec = cos(asin(sinDec));

  const cosH = (cos(zenith) - sinDec * sin(lat)) / (cosDec * cos(lat));
  if (cosH > 1) return null; // sun never rises this day
  if (cosH < -1) return null; // sun never sets this day

  let H = rising ? 360 - acos(cosH) : acos(cosH);
  H = H / 15;

  const T = H + RA - 0.06571 * t - 6.622; // local mean time
  let UT = norm(T - lngHour, 24); // to UTC

  const hour = Math.floor(UT);
  const minF = (UT - hour) * 60;
  const min = Math.floor(minF);
  const sec = Math.floor((minF - min) * 60);

  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, min, sec));
}

export function getSunTimes(date, lat, lng) {
  return {
    sunrise: calc(date, lat, lng, 90.833, true),
    sunset: calc(date, lat, lng, 90.833, false),
    dawn: calc(date, lat, lng, 96, true), // civil twilight begins
    dusk: calc(date, lat, lng, 96, false), // civil twilight ends
  };
}

// "14h 33m" daylight string from two Dates.
export function daylightLength(sunrise, sunset) {
  if (!sunrise || !sunset) return null;
  let ms = sunset - sunrise;
  if (ms < 0) ms += 86400000;
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}
