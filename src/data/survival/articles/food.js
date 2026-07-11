export default [
  {
    id: 'foraging-safety',
    categoryId: 'food',
    title: 'Foraging Safely',
    summary: 'When in doubt, do not eat it, avoid all unknown mushrooms, and never risk poisoning for food.',
    emergency: false,
    severity: 3,
    keywords: ['foraging', 'edible', 'plants', 'poison', 'mushroom', 'safe', 'wild food'],
    quickSteps: [
      'Only eat plants you can positively identify as safe.',
      'Never eat wild mushrooms unless you are certain they are safe.',
      'When in any doubt, do not eat it.',
      'Avoid plants with milky sap, bitter taste, spines, or an almond smell.',
      'Remember you can survive weeks without food, so never gamble.',
    ],
    sections: [
      {
        heading: 'The golden rule',
        paragraphs: [
          'The single most important rule of foraging is simple: when in doubt, do not eat it. A full stomach is not worth poisoning.',
          'A human body can survive for weeks without food, but a single poisonous plant or mushroom can cause serious harm or death within hours or days. The math is never in favour of a risky bite.',
        ],
      },
      {
        heading: 'Never eat unknown mushrooms',
        paragraphs: [
          'Mushrooms are the most dangerous thing to forage. Deadly mushrooms often look almost identical to safe ones, and there are no reliable field signs to tell them apart without training.',
          'Many poisonous mushrooms give no symptoms for a day or more, and by the time you feel ill the damage to the liver or kidneys may be done and untreatable.',
        ],
        warning: 'Avoid all wild mushrooms in a survival situation. They add little energy and carry the highest risk of any wild food.',
      },
      {
        heading: 'Warning signs on plants',
        paragraphs: [
          'Some features hint that a plant may be harmful. Be cautious of milky or discoloured sap, a bitter or soapy taste, fine hairs, spines, or thorns, an almond-like smell, and seeds or beans inside pods.',
          'These are only warnings. Some safe foods share them and some deadly plants have none. They are reasons to avoid a plant, never proof that one is safe.',
        ],
      },
      {
        heading: 'About the edibility test',
        paragraphs: [
          'There is an old universal edibility test where you touch, then taste, then eat a tiny amount of a plant and wait many hours between steps. It is slow, taking about a day per plant part, and it is not fully reliable.',
          'It does not work at all for mushrooms. Only consider it as a last resort, with an abundant plant, when there is truly nothing you can identify and starvation is a real threat.',
        ],
        warning: 'Do not rely on the edibility test as your plan. Positive identification of known safe plants is always safer.',
      },
    ],
    related: ['finding-food', 'food-priorities', 'safe-plants'],
  },
  {
    id: 'finding-food',
    categoryId: 'food',
    title: 'Finding Food',
    summary: 'The safest survival calories usually come from water, familiar plants, and small easy catches, not risky foraging.',
    emergency: false,
    severity: 3,
    keywords: ['food', 'find', 'forage', 'fish', 'insects', 'calories', 'eat'],
    quickSteps: [
      'Sort out water, warmth, shelter, and signalling before you chase food.',
      'Look for foods you already recognise as safe.',
      'Fish and shellfish are often easier and safer than land plants.',
      'Insects such as grubs and crickets are widespread protein when cooked.',
      'Cook everything you can to kill germs and parasites.',
    ],
    sections: [
      {
        heading: 'Put food in its place',
        paragraphs: [
          'Food is rarely your first survival priority. You can live for weeks without it, but only days without water and only hours in severe cold. Handle water, warmth, shelter, and signalling first.',
          'Once your immediate survival needs are met, food helps you keep strength and morale. Aim for easy, low-risk sources rather than spending huge energy for little reward.',
        ],
      },
      {
        heading: 'Lower-risk food sources',
        paragraphs: [
          'Water sources often hold the easiest food. Fish, shellfish, and other water creatures are usually safer to identify than wild plants.',
          'Insects are one of the most reliable protein sources on land. Grubs, crickets, grasshoppers, and ants are widespread. Cook them first, and avoid brightly coloured insects, hairy caterpillars, and anything that bites, stings, or smells bad.',
        ],
        steps: [
          'Check shallow water and under rocks for fish, crayfish, and shellfish.',
          'Look in rotting logs and soil for grubs and worms.',
          'Catch insects in the cool of morning when they move slowly.',
          'Remove wings and legs from larger insects, then cook them through.',
        ],
      },
      {
        heading: 'Cook to stay safe',
        paragraphs: [
          'Cooking kills most germs and parasites in meat, fish, and insects, and makes food easier to digest. Whenever you can make fire, cook your food fully.',
          'Do not eat anything found already dead unless you are certain it is fresh, and avoid animals that look or smell sick.',
        ],
        warning: 'Spoiled meat, raw shellfish from unknown water, and unknown plants can make you sick fast. In survival, illness that causes vomiting or diarrhoea is dangerous because it drains water you cannot spare.',
      },
    ],
    related: ['foraging-safety', 'food-priorities', 'finding-water'],
  },
  {
    id: 'food-priorities',
    categoryId: 'food',
    title: 'Food Priorities',
    summary: 'Food is a low priority in the short term, so ration what you have, protect water, and do not waste energy.',
    emergency: false,
    severity: 3,
    keywords: ['priorities', 'ration', 'food', 'energy', 'survival', 'water', 'hunger'],
    quickSteps: [
      'Do not panic about hunger. You can survive weeks without food.',
      'Handle water, warmth, shelter, and signalling before food.',
      'Take stock of any food you have and ration it sensibly.',
      'Do not eat if you have little water, since digestion uses water.',
      'Spend energy on food only when the likely reward is worth it.',
    ],
    sections: [
      {
        heading: 'Where food really ranks',
        paragraphs: [
          'In a survival situation, food is usually the least urgent need. The common guide is that a person can last about three weeks without food, three days without water, and three hours without shelter in harsh cold.',
          'Hunger feels urgent but rarely is in the first days. Do not let it push you into risky foraging or into burning energy you cannot replace.',
        ],
      },
      {
        heading: 'Rationing what you have',
        steps: [
          'Gather and count all the food you carry, then decide how long it may need to last.',
          'Eat small, regular amounts rather than everything at once. Steady energy helps thinking and warmth.',
          'Keep high-energy foods for when you most need strength, such as before hard effort or a cold night.',
          'Protect your food from animals and weather by sealing and storing it away from where you sleep.',
        ],
      },
      {
        heading: 'Food and water are linked',
        paragraphs: [
          'Digesting food, especially protein and dry food, uses up water your body needs. If you are short of water, it is better to eat little or nothing.',
          'Do not eat to fight hunger if you have almost no water to drink. Sort out drinking water first, then think about food.',
        ],
        warning: 'Never trade safe water for risky food. Dehydration and poisoning both kill far faster than hunger.',
      },
    ],
    related: ['finding-food', 'foraging-safety', 'finding-water'],
  },
];
