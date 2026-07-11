export default [
  {
    id: 'finding-water',
    categoryId: 'water',
    title: 'Finding Water',
    summary: 'How to locate water in the wild, and which sources to avoid, when your supply runs low.',
    emergency: false,
    severity: 2,
    keywords: ['find water', 'no water', 'thirsty', 'water source', 'collect rain', 'dew'],
    quickSteps: [
      'Rest in shade first. Moving in heat wastes the water in your body.',
      'Head downhill and toward green plants, valleys, and low ground.',
      'Collect rain and morning dew on any clean cloth or surface.',
      'Choose flowing water over still water where you can.',
      'Treat all wild water before drinking. Clear does not mean safe.',
      'Never drink sea water, urine, or blood. They make you drier.',
    ],
    sections: [
      {
        heading: 'Where water gathers',
        paragraphs: [
          'Water runs downhill and collects in low places.',
          'Follow valleys, gullies, and the base of cliffs. Green, lush plants often mark water nearby.',
          'Animal tracks and flying insects often lead toward water, especially at dawn and dusk.',
          'Flowing streams are usually safer than still ponds, but both must be treated.',
        ],
      },
      {
        heading: 'Collecting water without a stream',
        paragraphs: [
          'You can gather water even where there is no pond or river.',
        ],
        steps: [
          'Rain: spread a tarp, poncho, jacket, or clean cloth to catch it and funnel it into a container.',
          'Dew: at dawn, wipe a clean cloth over grass and leaves, then wring it into a container. Or tie cloths round your ankles and walk through wet grass.',
          'Rock hollows and tree crevices often hold rainwater after a shower.',
          'Snow and ice: melt it first. Do not eat snow directly, as it chills your body. Then treat it.',
        ],
      },
      {
        heading: 'What NOT to drink',
        paragraphs: [
          'Do not drink sea water. The salt draws water out of your body and speeds up dehydration.',
          'Do not drink urine or blood. They contain salt and waste and make you drier.',
          'Avoid water with a strong smell, foam, an oily film, or lots of algae, and water near dead animals or industry.',
        ],
        warning: 'Any wild water can carry germs that cause severe sickness and diarrhoea, which dries you out further. Always treat it before drinking. See Purifying Water.',
      },
      {
        heading: 'If you have very little water',
        paragraphs: [
          'Sip it, do not gulp it. Rest in shade and move in the cool of early morning or evening.',
          'Breathe through your nose and talk less to save moisture.',
          'It is better to drink the water you have now than to save it while you get weaker.',
        ],
      },
    ],
    related: ['purifying-water', 'storing-water', 'dehydration', 'shelter-site'],
  },
  {
    id: 'purifying-water',
    categoryId: 'water',
    title: 'Purifying Water',
    summary: 'How to make wild or unsafe water safe to drink by killing or removing germs.',
    emergency: false,
    severity: 2,
    keywords: ['purify water', 'boil water', 'clean water', 'water filter', 'safe to drink', 'treat water'],
    quickSteps: [
      'Let cloudy water settle, then pour off the clear water on top.',
      'Strain it through a clean cloth to remove dirt.',
      'Best method: bring it to a rolling boil for 1 full minute.',
      'Above about 2000 m (6500 ft), boil for 3 minutes.',
      'No fire? Use a proper water filter, or chemical tablets, or a UV device.',
      'Let it cool and store it in a clean, covered container.',
    ],
    sections: [
      {
        heading: 'Clear is not the same as safe',
        paragraphs: [
          'Water can look perfectly clear and still be full of germs that make you very ill.',
          'Always treat wild water, even from a fast mountain stream.',
          'If the water is cloudy or dirty, let it settle and strain it through cloth first. Cleaner water is treated more easily.',
        ],
      },
      {
        heading: 'Boiling, the surest method',
        paragraphs: [
          'Boiling kills germs, bacteria, viruses, and parasites. It is the most reliable method.',
        ],
        steps: [
          'Heat the water until it is bubbling hard, a rolling boil.',
          'Keep it at a rolling boil for 1 full minute.',
          'At high altitude, above about 2000 m or 6500 ft, boil for 3 minutes.',
          'Let it cool on its own. Do not add untreated water or ice.',
        ],
        warning: 'Boiling does not remove chemicals or fuel. If water may be polluted by chemicals, boiling will not make it safe.',
      },
      {
        heading: 'Other ways to treat water',
        paragraphs: [
          'Use these when you cannot boil.',
        ],
        steps: [
          'Filters: a proper water filter with a pore size of 1 micron or smaller removes bacteria and parasites like Giardia and Cryptosporidium, but most do not remove viruses.',
          'Chemical treatment: chlorine dioxide or purification tablets kill most germs. Follow the packet exactly. Cold or cloudy water needs longer, often 30 minutes and up to 4 hours for some parasites.',
          'UV light devices: stir the UV pen in clear water for the stated time. The water must be clear first, so pre-filter cloudy water.',
          'Solar method: in a clear plastic bottle, lay water in full strong sun for at least 6 hours. This is a last resort and works best with clear water on a bright day.',
        ],
      },
      {
        heading: 'Combine methods for dirty water',
        paragraphs: [
          'For the safest result, first strain and settle the water, then treat it.',
          'Chemicals and UV work poorly in cloudy water, so remove dirt first.',
          'A filter plus a chemical or boiling step covers both parasites and viruses.',
        ],
      },
    ],
    related: ['finding-water', 'storing-water', 'dehydration', 'building-fire'],
  },
  {
    id: 'storing-water',
    categoryId: 'water',
    title: 'Storing Water',
    summary: 'How to keep treated water clean and cool so it stays safe to drink.',
    emergency: false,
    severity: 3,
    keywords: ['store water', 'keep water', 'water container', 'save water', 'water supply'],
    quickSteps: [
      'Use clean, covered containers for treated water.',
      'Keep treated water apart from untreated water.',
      'Store it in shade or a cool, dark place.',
      'Label or remember which containers are safe to drink.',
      'Cover any open water to keep out dirt, insects, and animals.',
    ],
    sections: [
      {
        heading: 'Keep clean water clean',
        paragraphs: [
          'Water that has been treated can be spoiled again by a dirty container or dirty hands.',
          'Only use clean containers. Rinse bottles with treated water if you can.',
          'Never let the mouth of a clean container touch untreated water or dirty surfaces.',
        ],
      },
      {
        heading: 'Storing it well',
        paragraphs: [
          'Good storage keeps water safe and slows spoiling.',
        ],
        steps: [
          'Fill containers to the top and seal them to keep air and dirt out.',
          'Keep them in shade, in a cool spot, or buried slightly in cool ground.',
          'Keep treated and untreated water clearly separate so you never mix them up.',
          'Pour water out to drink rather than putting your mouth on a shared container.',
        ],
      },
      {
        heading: 'Good sense while stored',
        paragraphs: [
          'Cool, dark storage slows the growth of germs and keeps water pleasant to drink.',
          'If stored water starts to smell bad, look cloudy, or grow algae, treat it again before drinking.',
          'In cold weather, keep a bottle inside your clothing to stop it freezing, and keep drinking small amounts.',
        ],
        warning: 'Do not store water in containers that held fuel, chemicals, or anything toxic. Traces can poison the water.',
      },
    ],
    related: ['purifying-water', 'finding-water', 'dehydration'],
  },
  {
    id: 'dehydration',
    categoryId: 'water',
    title: 'Dehydration',
    summary: 'Your body does not have enough water to work properly, which harms your thinking and strength.',
    emergency: false,
    severity: 2,
    keywords: ['dehydrated', 'thirsty', 'dark urine', 'dizzy', 'dry mouth', 'not enough water'],
    quickSteps: [
      'Rest in shade and get out of heat, wind, and sun.',
      'Sip water often, a little at a time, not one large gulp.',
      'Add a pinch of salt and some sugar to water if you have them.',
      'Slow down and avoid heavy effort until you recover.',
      'For severe signs like confusion or fainting, get emergency help.',
    ],
    sections: [
      {
        heading: 'Signs to look for',
        paragraphs: [
          'Early: thirst, dry mouth and lips, tiredness, headache, and dark yellow urine that you pass less often.',
          'Worse: dizziness, weakness, feeling sick, cramps, sunken eyes, and skin that is slow to spring back when pinched.',
          'Severe: confusion, a fast heartbeat, fast breathing, fainting, and very little or no urine.',
        ],
        warning: 'Dark urine, or not needing to pass urine, is an early warning that you need to drink more. Pale urine usually means you are drinking enough.',
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Cool down, rest, and put water back into the body slowly.',
        ],
        steps: [
          'Move into shade and reduce activity.',
          'Sip water steadily. Small, frequent sips are absorbed better than a large amount at once.',
          'If you have them, add a small pinch of salt and a little sugar to make a rehydration drink, or use rehydration sachets.',
          'Loosen clothing and cool the skin if you are also overheated.',
        ],
      },
      {
        heading: 'What to avoid',
        paragraphs: [
          'Do not drink alcohol. It makes dehydration worse.',
          'Do not drink sea water, urine, or blood. They all speed up dehydration.',
          'Do not push on with hard work or walking in the heat until you have recovered.',
        ],
      },
      {
        heading: 'When it is an emergency',
        paragraphs: [
          'Get emergency help if the person is confused, faints, cannot keep fluids down, or has stopped passing urine.',
          'Severe dehydration can lead to collapse and needs medical care.',
        ],
      },
      {
        heading: 'Prevention',
        paragraphs: [
          'Drink regularly through the day, before you feel very thirsty.',
          'Drink more in heat, at altitude, and during hard effort.',
          'Rest and travel in the cooler parts of the day, and keep covered from the sun.',
        ],
      },
    ],
    related: ['finding-water', 'purifying-water', 'heat-exhaustion', 'heatstroke'],
  },
];
