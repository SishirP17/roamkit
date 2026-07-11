export default [
  {
    id: 'direction-sun',
    categoryId: 'navigation',
    title: 'Direction From the Sun',
    summary: 'The sun rises in the east and sets in the west, which gives you a rough compass all day.',
    emergency: false,
    severity: 3,
    keywords: ['sun', 'east', 'west', 'compass', 'direction', 'sunrise', 'sunset'],
    quickSteps: [
      'At sunrise, face the sun. You are looking roughly east.',
      'At sunset, face the sun. You are looking roughly west.',
      'Stretch your right arm to east and left arm to west. You now face north.',
      'At midday the sun sits due south (northern hemisphere) or due north (southern hemisphere).',
      'Note the direction you need, then pick a fixed landmark that way and walk to it.',
    ],
    sections: [
      {
        heading: 'The basic rule',
        paragraphs: [
          'The sun always rises in the general east and sets in the general west. This is true everywhere on Earth.',
          'This gives you two rough fixes each day, one at sunrise and one at sunset. Even a rough direction is enough to stop you walking in circles.',
        ],
      },
      {
        heading: 'Finding all four directions',
        paragraphs: [
          'Once you know east, the rest follows. Stand with your right hand pointing east and your left hand pointing west.',
          'You are now facing north. South is directly behind you. This works in the northern hemisphere. In the southern hemisphere, face west with your right hand instead so you face south.',
        ],
      },
      {
        heading: 'Using the midday sun',
        paragraphs: [
          'Around noon the sun is at its highest point. In the northern hemisphere it sits in the south at that moment. In the southern hemisphere it sits in the north.',
          'Shadows are shortest at midday and point away from the sun. In the northern hemisphere the shortest shadow points north.',
        ],
        warning: 'Near the equator the sun passes almost straight overhead, so midday direction is unreliable. Use sunrise and sunset there instead.',
      },
      {
        heading: 'Stay honest about accuracy',
        paragraphs: [
          'This method gives a general direction, not a precise heading. The exact rise and set point drifts north or south with the seasons.',
          'For steady travel, pick a distant landmark in your chosen direction and walk to it, then pick another. This keeps your line straight between sun checks.',
        ],
      },
    ],
    related: ['shadow-stick', 'direction-stars', 'staying-oriented'],
  },
  {
    id: 'direction-stars',
    categoryId: 'navigation',
    title: 'Direction From the Stars',
    summary: 'At night the North Star or the Southern Cross shows you a fixed direction to steer by.',
    emergency: false,
    severity: 3,
    keywords: ['stars', 'north star', 'polaris', 'southern cross', 'night', 'big dipper', 'direction'],
    quickSteps: [
      'Northern hemisphere: find the Big Dipper, then follow its two pointer stars to the North Star.',
      'Face the North Star and you face true north.',
      'Southern hemisphere: find the Southern Cross, the small tilted cross of four bright stars.',
      'Extend the long axis of the cross about five times its length to an empty point in the sky.',
      'Drop straight down from that point to the horizon. That direction is south.',
    ],
    sections: [
      {
        heading: 'North Star (northern hemisphere)',
        paragraphs: [
          'The North Star, also called Polaris, sits almost exactly above the North Pole. Unlike other stars it barely moves through the night.',
          'Find the Big Dipper, a group of seven stars shaped like a saucepan. The two stars at the outer edge of the pan are the pointer stars.',
          'Draw an imaginary line up from the two pointers. Extend it about five times the gap between them. It lands on the North Star. Facing it, you face north.',
        ],
      },
      {
        heading: 'Southern Cross (southern hemisphere)',
        paragraphs: [
          'South of the equator there is no bright pole star. Instead use the Southern Cross, four bright stars in the shape of a cross tilted to one side.',
          'Follow the long axis of the cross, from the top star through the bottom star, and extend that line about five times the length of the cross.',
          'From that empty point in the sky, look straight down to the horizon. Where it meets the horizon is roughly south.',
        ],
      },
      {
        heading: 'Mark your direction on the ground',
        paragraphs: [
          'Stars are hard to hold in your eye while you walk. Once you have found north or south, line it up with a fixed landmark on the horizon.',
          'Push two sticks into the ground pointing that way, or note a distant hill or tree. Steer by the landmark and check the stars again if you drift.',
        ],
        warning: 'Do not walk while staring up at the sky. On rough ground at night that is how people fall or get hurt. Fix the direction, then walk looking ahead.',
      },
    ],
    related: ['direction-sun', 'staying-oriented', 'shadow-stick'],
  },
  {
    id: 'shadow-stick',
    categoryId: 'navigation',
    title: 'Shadow Stick Method',
    summary: 'A stick and its moving shadow give you a clear east to west line in about fifteen minutes.',
    emergency: false,
    severity: 3,
    keywords: ['shadow', 'stick', 'sun', 'east', 'west', 'direction', 'compass'],
    quickSteps: [
      'Push a straight stick about a metre long upright into level, clear ground.',
      'Mark the tip of its shadow with a stone or twig. This first mark is west.',
      'Wait 10 to 15 minutes for the shadow tip to move.',
      'Mark the new shadow tip. This second mark is east.',
      'The line between the two marks runs east to west. Stand with west on your left to face north.',
    ],
    sections: [
      {
        heading: 'Why it works',
        paragraphs: [
          'The sun moves across the sky from east to west, so shadows swing the opposite way, from west to east, through the day.',
          'By marking the shadow tip twice, a short time apart, you capture that movement. The line between your marks is a reliable east to west line.',
        ],
      },
      {
        heading: 'Step by step',
        steps: [
          'Find a flat, open patch of ground where the stick casts a clear shadow.',
          'Stand a straight stick about a metre long upright in the ground.',
          'Put a small stone or peg exactly at the tip of the shadow. Remember: this first mark is always west.',
          'Wait until the shadow tip has moved a few centimetres, usually 10 to 15 minutes.',
          'Put a second stone at the new shadow tip. This mark is east.',
          'Draw or scratch a line between the two stones. That is your east to west line.',
        ],
      },
      {
        heading: 'Reading north and south',
        paragraphs: [
          'Stand with the first mark (west) on your left and the second mark (east) on your right. You are now facing north. South is behind you.',
          'This holds in both hemispheres because the first mark is always west and the second is always east.',
        ],
        warning: 'You need sunshine and a visible shadow. On a heavily overcast day this method will not work. Fall back on the stars at night or known landmarks.',
      },
    ],
    related: ['direction-sun', 'direction-stars', 'staying-oriented'],
  },
  {
    id: 'natural-signs',
    categoryId: 'navigation',
    title: 'Natural Direction Signs',
    summary: 'Land, plants, and water flow give rough clues to direction, but treat them as hints, not proof.',
    emergency: false,
    severity: 3,
    keywords: ['natural', 'moss', 'signs', 'nature', 'direction', 'wind', 'terrain', 'water'],
    quickSteps: [
      'Notice which slopes get the most sun. In the north they face south, in the south they face north.',
      'Follow flowing water downhill. It usually leads to larger rivers, roads, and people.',
      'Read the prevailing wind by how trees and grass lean over time.',
      'Cross check any natural sign against the sun or stars before you trust it.',
    ],
    sections: [
      {
        heading: 'Sun-facing slopes',
        paragraphs: [
          'The side of a hill that gets more sun is warmer and drier. In the northern hemisphere that is the south-facing side. In the southern hemisphere it is the north-facing side.',
          'On sun-facing slopes snow melts first, plants are often greener or different, and the ground is drier. These differences hint at direction over a whole hillside.',
        ],
      },
      {
        heading: 'Water and terrain',
        paragraphs: [
          'Water always flows downhill. Following a stream downstream usually leads to bigger streams, then rivers, and rivers lead to towns, roads, and rescue.',
          'Ridgelines and valleys tend to run in long consistent lines in a given area. Once you learn the lay of the land, they help you keep a straight course.',
        ],
      },
      {
        heading: 'Do not trust moss myths',
        paragraphs: [
          'The old saying that moss grows on the north side of trees is not reliable. Moss grows wherever it is damp and shaded, which can be any side.',
          'Treat every natural sign as a weak clue. Wind direction, tree lean, and animal trails can all mislead you.',
        ],
        warning: 'Never bet your route on a single natural sign. Always confirm with the sun by day or the stars by night before committing to a direction.',
      },
    ],
    related: ['direction-sun', 'staying-oriented', 'finding-water'],
  },
  {
    id: 'staying-oriented',
    categoryId: 'navigation',
    title: 'Staying Oriented',
    summary: 'Deciding whether to stay put and keeping track of where you are matters more than any single trick.',
    emergency: false,
    severity: 2,
    keywords: ['lost', 'oriented', 'stay put', 'landmarks', 'direction', 'stop', 'plan'],
    quickSteps: [
      'Stop as soon as you feel lost. Do not keep walking.',
      'Sit down, drink water, and calm your breathing before deciding anything.',
      'If people know your route, staying put is usually safest. Make yourself easy to find.',
      'If you must move, pick one clear direction and mark your trail as you go.',
      'Check your direction often against the sun, stars, or a landmark.',
    ],
    sections: [
      {
        heading: 'Stop before you are truly lost',
        paragraphs: [
          'The moment you doubt where you are, stop moving. Every extra step while lost can take you further from help and from your own trail.',
          'Sit, drink, and breathe slowly. A calm mind makes far better decisions than a panicked one. Fear pushes people to walk fast in the wrong direction.',
        ],
      },
      {
        heading: 'Stay or go',
        paragraphs: [
          'If anyone knows your planned route and expected return time, staying put is usually the safest choice. Rescuers search along known routes first.',
          'Stay near shelter, water, and open ground where you can be seen. Lay out signals and make noise at regular times.',
          'Only travel if no one knows where you are, or if staying means no water or no shelter. If you go, commit to one direction.',
        ],
      },
      {
        heading: 'Keep track as you move',
        paragraphs: [
          'Pick a distant landmark in your chosen direction and walk to it. Then pick the next one. This keeps your line straight.',
          'Leave a clear trail: bent branches, stacked stones, scratches, or arrows on the ground. This lets you backtrack and helps rescuers follow you.',
          'Look back often. The land looks different from the other direction, and remembering it helps you return.',
        ],
        warning: 'Never travel at night in unknown terrain unless you must. Hidden drops, water, and cold make night movement dangerous.',
      },
    ],
    related: ['direction-sun', 'direction-stars', 'rule-of-3-signals', 'stay-or-go'],
  },
];
