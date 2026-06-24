// Cities for the World Clock. timeZone is an IANA name — time is computed
// fully offline from the device's built-in timezone database via Intl.
export const CITIES = [
  { id: 'london', name: 'London', country: 'UK', tz: 'Europe/London', flag: '🇬🇧' },
  { id: 'paris', name: 'Paris', country: 'France', tz: 'Europe/Paris', flag: '🇫🇷' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', tz: 'Europe/Berlin', flag: '🇩🇪' },
  { id: 'madrid', name: 'Madrid', country: 'Spain', tz: 'Europe/Madrid', flag: '🇪🇸' },
  { id: 'rome', name: 'Rome', country: 'Italy', tz: 'Europe/Rome', flag: '🇮🇹' },
  { id: 'moscow', name: 'Moscow', country: 'Russia', tz: 'Europe/Moscow', flag: '🇷🇺' },
  { id: 'istanbul', name: 'Istanbul', country: 'Türkiye', tz: 'Europe/Istanbul', flag: '🇹🇷' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', tz: 'Asia/Dubai', flag: '🇦🇪' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', tz: 'Asia/Kolkata', flag: '🇮🇳' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', tz: 'Asia/Bangkok', flag: '🇹🇭' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore', flag: '🇸🇬' },
  { id: 'hongkong', name: 'Hong Kong', country: 'China', tz: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { id: 'shanghai', name: 'Shanghai', country: 'China', tz: 'Asia/Shanghai', flag: '🇨🇳' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'seoul', name: 'Seoul', country: 'South Korea', tz: 'Asia/Seoul', flag: '🇰🇷' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', tz: 'Australia/Sydney', flag: '🇦🇺' },
  { id: 'auckland', name: 'Auckland', country: 'New Zealand', tz: 'Pacific/Auckland', flag: '🇳🇿' },
  { id: 'newyork', name: 'New York', country: 'USA', tz: 'America/New_York', flag: '🇺🇸' },
  { id: 'chicago', name: 'Chicago', country: 'USA', tz: 'America/Chicago', flag: '🇺🇸' },
  { id: 'denver', name: 'Denver', country: 'USA', tz: 'America/Denver', flag: '🇺🇸' },
  { id: 'losangeles', name: 'Los Angeles', country: 'USA', tz: 'America/Los_Angeles', flag: '🇺🇸' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', tz: 'America/Toronto', flag: '🇨🇦' },
  { id: 'mexico', name: 'Mexico City', country: 'Mexico', tz: 'America/Mexico_City', flag: '🇲🇽' },
  { id: 'saopaulo', name: 'São Paulo', country: 'Brazil', tz: 'America/Sao_Paulo', flag: '🇧🇷' },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', tz: 'Africa/Cairo', flag: '🇪🇬' },
  { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', tz: 'Africa/Johannesburg', flag: '🇿🇦' },
  { id: 'honolulu', name: 'Honolulu', country: 'USA', tz: 'Pacific/Honolulu', flag: '🇺🇸' },
];

export const CITY_MAP = CITIES.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {});
