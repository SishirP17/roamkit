// Offline survival & first-aid reference. Text-only (tiny storage footprint).
// Content is general guidance for emergencies when help may be far away — it is
// NOT a substitute for professional medical care or training.

export const SURVIVAL = [
  {
    id: 'priorities',
    icon: '🧠',
    title: 'Survival priorities',
    blocks: [
      {
        sub: 'The Rule of 3s',
        steps: [
          '3 minutes without air',
          '3 hours without shelter in harsh weather',
          '3 days without water',
          '3 weeks without food',
        ],
      },
      {
        sub: 'Order of action',
        steps: [
          'Stop and stay calm — panic kills. Sit, breathe, think.',
          'Treat any life-threatening injuries first.',
          'Get protection from the weather (shelter, warmth).',
          'Signal for rescue and make yourself visible.',
          'Find clean water, then worry about food.',
          'If unsure, STAY PUT — moving makes you harder to find.',
        ],
      },
    ],
  },
  {
    id: 'firstaid',
    icon: '🩹',
    title: 'First aid',
    blocks: [
      {
        sub: 'Severe bleeding',
        steps: [
          'Press hard directly on the wound with a cloth or your hand.',
          'Keep pressing — do not lift to peek. Add cloth on top if it soaks through.',
          'Raise the injured part above the heart if you can.',
          'Only use a tourniquet for life-threatening limb bleeding; note the time.',
        ],
      },
      {
        sub: 'CPR (not breathing, no pulse)',
        steps: [
          'Call for emergency help first if at all possible.',
          'Push hard and fast in the centre of the chest, ~5cm deep.',
          'Rhythm: about 100–120 pushes per minute.',
          'Let the chest rise fully between pushes. Don’t stop until help/recovery.',
        ],
      },
      {
        sub: 'Choking',
        steps: [
          'If they can cough or speak, encourage coughing.',
          'If not: 5 firm back blows between the shoulder blades.',
          'Then 5 abdominal thrusts (hands above the navel, pull in and up).',
          'Repeat back blows and thrusts until cleared.',
        ],
      },
      {
        sub: 'Burns',
        steps: [
          'Cool with running cool (not ice) water for 20 minutes.',
          'Remove jewellery/tight items before swelling starts.',
          'Cover loosely with clean, non-fluffy material or cling film.',
          'Never pop blisters or apply creams/butter.',
        ],
      },
      {
        sub: 'Shock (pale, cold, faint)',
        steps: [
          'Lay them down, raise the legs if no leg injury.',
          'Keep them warm and calm; loosen tight clothing.',
          'Do not give food or drink. Get help urgently.',
        ],
      },
      {
        sub: 'Sprains & possible fractures',
        steps: [
          'Rest, and do not force movement of a suspected break.',
          'Immobilise/splint in the position found, padding around it.',
          'Apply something cold (wrapped) for swelling. Elevate if possible.',
        ],
      },
    ],
  },
  {
    id: 'cold',
    icon: '❄️',
    title: 'Cold & heat',
    blocks: [
      {
        sub: 'Hypothermia (too cold)',
        steps: [
          'Signs: intense shivering, slurred speech, clumsiness, confusion.',
          'Get out of wind/wet. Remove wet clothes, insulate from the ground.',
          'Warm the core (torso) with dry layers, warm drinks if alert.',
          'Handle gently; warm slowly. Avoid rubbing limbs.',
        ],
      },
      {
        sub: 'Heat exhaustion / heatstroke (too hot)',
        steps: [
          'Move to shade, lie down, raise the feet.',
          'Cool with water on skin, fan, remove excess clothing.',
          'Sip water if conscious.',
          'Confusion, no sweating or collapse = heatstroke: cool fast, get help now.',
        ],
      },
    ],
  },
  {
    id: 'water',
    icon: '💧',
    title: 'Water',
    blocks: [
      {
        sub: 'Finding it',
        steps: [
          'Follow valleys downhill; listen for running water.',
          'Collect rain and morning dew with cloth.',
          'Flowing water is usually safer than still water.',
        ],
      },
      {
        sub: 'Making it safe',
        steps: [
          'Boil for 1 full minute (3 minutes at high altitude). Safest method.',
          'No fire? Filter through cloth to remove dirt, then purify if you can.',
          'Purification tablets or drops if you have them.',
          'Clear ≠ clean. Treat all wild water if possible.',
        ],
      },
    ],
  },
  {
    id: 'fire',
    icon: '🔥',
    title: 'Fire',
    blocks: [
      {
        sub: 'Build it in stages',
        steps: [
          'Tinder: dry grass, bark, lint — catches a spark.',
          'Kindling: pencil-thin dry twigs.',
          'Fuel: thumb-thick and larger, added gradually.',
          'Shape a teepee or log-cabin; light the tinder, protect from wind.',
          'Clear a ring, keep water/dirt nearby, never leave it unattended.',
        ],
      },
    ],
  },
  {
    id: 'shelter',
    icon: '⛺',
    title: 'Shelter',
    blocks: [
      {
        sub: 'Stay protected',
        steps: [
          'Insulate from the GROUND first — it steals heat fast.',
          'Pick high, dry ground; avoid valley bottoms (cold) and lone trees (lightning).',
          'Small shelters trap body heat better than large ones.',
          'Use natural cover: rock overhangs, fallen trees, dense evergreens.',
        ],
      },
    ],
  },
  {
    id: 'signal',
    icon: '🆘',
    title: 'Signalling for rescue',
    blocks: [
      {
        sub: 'Universal distress',
        steps: [
          'Three of anything = distress: 3 whistle blasts, 3 fires, 3 flashes.',
          'SOS in Morse: ··· ——— ··· (short-short-short, long-long-long, short-short-short).',
          'A whistle carries far further than your voice — conserve energy.',
          'A mirror/phone screen flash can be seen for miles in sunlight.',
        ],
      },
      {
        sub: 'Ground-to-air signals (make them BIG)',
        steps: [
          'V  =  Need assistance',
          'X  =  Need medical help',
          '→  =  Going this way (arrow shows direction)',
          'Use rocks, logs, or trampled snow; high contrast with the ground.',
        ],
      },
    ],
  },
  {
    id: 'navigation',
    icon: '🧭',
    title: 'Finding direction',
    blocks: [
      {
        sub: 'Without a compass or GPS',
        steps: [
          'Sun rises roughly east, sets roughly west.',
          'Northern hemisphere: find Polaris (North Star) off the Big Dipper — that way is north.',
          'Southern hemisphere: use the Southern Cross to find south.',
          'Stick shadow: mark the shadow tip, wait 15 min, mark again — first mark is west.',
        ],
      },
    ],
  },
  {
    id: 'food',
    icon: '🍄',
    title: 'Food & foraging',
    blocks: [
      {
        sub: 'Safety first',
        steps: [
          'When in doubt, do NOT eat it — a wrong plant or mushroom can kill.',
          'Avoid mushrooms entirely unless you are 100% certain.',
          'Avoid plants with milky sap, bitter taste, or umbrella-shaped flower clusters.',
          'You can survive weeks without food — never risk poisoning for a meal.',
        ],
      },
    ],
  },
];
