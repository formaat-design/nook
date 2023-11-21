const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export const getRelativeTime = (now: number, start: number) => {
  const intl = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const relativeTime = now - start;
  const elapsed = Math.abs(relativeTime);

  const sign = Math.sign(-relativeTime);

  if (elapsed < SECOND) {
    return `${Math.round(elapsed)}ms`;
  } else if (elapsed < MINUTE) {
    return intl.format(sign * Math.round(elapsed / SECOND), 'second');
  } else if (elapsed < HOUR) {
    return intl.format(sign * Math.round(elapsed / MINUTE), 'minute');
  } else if (elapsed < DAY) {
    return intl.format(sign * Math.round(elapsed / HOUR), 'hour');
  } else if (elapsed < MONTH) {
    return intl.format(sign * Math.round(elapsed / DAY), 'day');
  } else if (elapsed < YEAR) {
    return intl.format(sign * Math.round(elapsed / MONTH), 'month');
  } else {
    return intl.format(sign * Math.round(elapsed / YEAR), 'year');
  }
};