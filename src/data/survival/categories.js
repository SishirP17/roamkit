// Top-level survival categories. Each groups a set of articles (see articles/).
// `color` is a KEY into tileColors (theme.js), never a hex literal, so the whole
// guide restyles from one place. `icon` is a single emoji shown in the tile badge.
export const CATEGORIES = [
  {
    id: 'priorities',
    title: 'Priorities & Mindset',
    icon: '🧠',
    color: 'purple',
    order: 1,
    blurb: 'What to do first, and how to stay calm.',
  },
  {
    id: 'first-aid',
    title: 'First Aid',
    icon: '🩹',
    color: 'pink',
    order: 2,
    blurb: 'Bleeding, CPR, choking, burns and more.',
  },
  {
    id: 'cold-heat',
    title: 'Cold & Heat',
    icon: '🌡️',
    color: 'teal',
    order: 3,
    blurb: 'Hypothermia, frostbite, heat illness.',
  },
  {
    id: 'water',
    title: 'Water',
    icon: '💧',
    color: 'blue',
    order: 4,
    blurb: 'Find it, make it safe, stay hydrated.',
  },
  {
    id: 'fire',
    title: 'Fire',
    icon: '🔥',
    color: 'orange',
    order: 5,
    blurb: 'Build it, keep it, stay safe.',
  },
  {
    id: 'shelter',
    title: 'Shelter',
    icon: '⛺',
    color: 'green',
    order: 6,
    blurb: 'Get out of the weather and off the ground.',
  },
  {
    id: 'weather',
    title: 'Weather & Hazards',
    icon: '⛈️',
    color: 'slate',
    order: 7,
    blurb: 'Lightning, floods, storms, altitude.',
  },
  {
    id: 'navigation',
    title: 'Finding Direction',
    icon: '🧭',
    color: 'teal',
    order: 8,
    blurb: 'Sun, stars and natural signs.',
  },
  {
    id: 'signalling',
    title: 'Signalling & Rescue',
    icon: '🆘',
    color: 'amber',
    order: 9,
    blurb: 'Be seen, be heard, get found.',
  },
  {
    id: 'animals-plants',
    title: 'Animals & Plants',
    icon: '🐍',
    color: 'green',
    order: 10,
    blurb: 'Bites, stings, and what not to touch.',
  },
  {
    id: 'food',
    title: 'Food & Foraging',
    icon: '🍄',
    color: 'amber',
    order: 11,
    blurb: 'Eat safely, or not at all.',
  },
];

// Null-prototype: looked up with raw route params, and a plain object would
// return Object.prototype members for ids like "constructor".
export const CATEGORY_BY_ID = Object.assign(
  Object.create(null),
  Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
);
