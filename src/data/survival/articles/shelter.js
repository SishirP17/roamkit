export default [
  {
    id: 'shelter-site',
    categoryId: 'shelter',
    title: 'Choosing a Shelter Site',
    summary: 'Where you build matters more than what you build; pick safe, dry ground before you start.',
    emergency: false,
    severity: 2,
    keywords: ['shelter', 'site', 'location', 'safe', 'ground', 'camp'],
    quickSteps: [
      'Look up: avoid dead trees and loose branches overhead.',
      'Pick high, dry, flat ground away from water channels.',
      'Avoid valley bottoms and hollows where cold air pools.',
      'Stay clear of lone tall trees and exposed ridgelines.',
      'Build near firewood and water, but not right next to water.',
      'Face the opening away from the wind.',
    ],
    sections: [
      {
        heading: 'Look up and around for hazards',
        paragraphs: [
          'A good site is first a safe site. The biggest dangers come from above and from water. Take a slow look around before committing.',
          'Dead standing trees and hanging broken branches, called widowmakers, can fall in wind and kill without warning.',
        ],
        steps: [
          'Do not camp under dead trees or large loose branches.',
          'Avoid the base of cliffs and steep slopes where rocks or snow can fall.',
          'Avoid dry stream beds and low channels that can flood in sudden rain.',
        ],
      },
      {
        heading: 'Pick ground that stays dry and warm',
        paragraphs: [
          'Cold air sinks and collects in valley bottoms and hollows at night. Water gathers in low spots. Slightly raised, level, dry ground is warmer and safer.',
        ],
        steps: [
          'Choose flat, dry ground on a gentle rise, not a dip.',
          'Feel the soil. Sandy or leafy ground drains better than clay or moss.',
          'In cold weather, avoid open ridgelines where wind strips away heat.',
        ],
        warning: 'In a thunderstorm, do not shelter under a single tall tree or on an exposed high point. Both attract lightning.',
      },
      {
        heading: 'Balance resources and effort',
        paragraphs: [
          'The site should be near what you need but not so far from rescue that you cannot be found. Building costs energy, so do not waste it.',
        ],
        steps: [
          'Stay near firewood and water to save trips and calories.',
          'Keep a short distance from water, not on its bank, to avoid damp, bugs, and flooding.',
          'If you may be searched for, stay visible and near where you were last known to be.',
        ],
      },
    ],
    related: ['ground-insulation', 'shelter-types', 'staying-dry', 'lightning'],
  },
  {
    id: 'ground-insulation',
    categoryId: 'shelter',
    title: 'Insulating From the Ground',
    summary: 'Cold ground pulls body heat away fast; a thick dry layer under you is the most important part of any shelter.',
    emergency: false,
    severity: 1,
    keywords: ['ground', 'insulation', 'cold', 'conduction', 'bedding', 'hypothermia'],
    quickSteps: [
      'Never lie directly on cold or wet ground.',
      'Pile a thick layer of dry material under your whole body.',
      'Use leaves, grass, pine needles, boughs, or a pad.',
      'Compress it and it loses warmth, so make it deep.',
      'Insulate hips and shoulders, the points that press down hardest.',
    ],
    sections: [
      {
        heading: 'Why the ground is the real threat',
        paragraphs: [
          'Lying on cold ground drains heat from your body far faster than cold air does. This is called conduction. Many people freeze even inside a good shelter because they insulated the roof but not the floor.',
          'You can become dangerously cold this way even in mild weather. A thick barrier between your body and the earth is not optional. It is the priority.',
        ],
      },
      {
        heading: 'Build a thick bed',
        paragraphs: [
          'Almost any dry, fluffy natural material traps air and blocks the cold. It must be thick, because your body weight crushes it flat where you lie.',
        ],
        steps: [
          'Gather dry leaves, grass, ferns, pine needles, moss, or evergreen boughs.',
          'Pile at least a hand-depth of loose material, ideally much more, since it compresses.',
          'Lie on it and add more anywhere you still feel the cold coming through.',
          'A backpack, spare clothes, or a foam pad also work as insulation.',
        ],
        warning: 'Wet insulation does not work. Damp material conducts cold almost like the bare ground. Keep your bedding dry.',
      },
      {
        heading: 'Protect the pressure points',
        paragraphs: [
          'Your hips, shoulders, and back press hardest into the ground and lose the most heat. Give them the deepest padding. Even a short person can lose heat through a thin spot, so check the whole length of your body.',
        ],
      },
    ],
    related: ['shelter-site', 'shelter-types', 'staying-dry', 'hypothermia'],
  },
  {
    id: 'shelter-types',
    categoryId: 'shelter',
    title: 'Types of Shelter',
    summary: 'Simple shelters you can build from what is around you, matched to your weather and materials.',
    emergency: false,
    severity: 2,
    keywords: ['shelter', 'debris hut', 'lean-to', 'tarp', 'snow', 'build'],
    quickSteps: [
      'Keep it small; a snug space traps your body heat.',
      'Use natural cover first: overhangs, fallen trees, thick evergreens.',
      'A lean-to blocks wind and reflects fire heat.',
      'A debris hut works like a sleeping bag with no fire.',
      'In deep snow, a trench or quinzhee shelters you from wind.',
      'Insulate the floor no matter which type you build.',
    ],
    sections: [
      {
        heading: 'Start small and use what is there',
        paragraphs: [
          'A shelter only needs to block wind and rain and hold your warmth. Smaller is warmer, because there is less air for your body to heat. Do not build a mansion.',
          'Before building, look for natural shelter you can improve: a rock overhang, a fallen tree, a dense evergreen, or a hollow. Nature has often done most of the work.',
        ],
      },
      {
        heading: 'Lean-to and A-frame',
        paragraphs: [
          'A lean-to is a single slanted wall that blocks wind and rain from one side. It is quick and works well paired with a fire in front, which reflects heat back at you. A tarp or poncho makes this fast.',
        ],
        steps: [
          'Set a ridgepole between two supports or against a log.',
          'Lean branches or a tarp against it at an angle.',
          'Cover the frame with leaves, boughs, or bark, layered like roof shingles from the bottom up.',
          'Face the open side away from the wind.',
        ],
      },
      {
        heading: 'Debris hut',
        paragraphs: [
          'A debris hut is a low, closed-in pile of debris you crawl into. It traps body heat like a sleeping bag and needs no fire. It is one of the warmest shelters you can build by hand.',
        ],
        steps: [
          'Prop one end of a ridgepole on a stump or forked branch, the other on the ground.',
          'Lean ribs of sticks along both sides to make a tunnel just big enough for your body.',
          'Pile leaves and debris two to three feet thick over the whole frame for warmth and rain proofing.',
          'Stuff the inside with dry debris for floor insulation, then crawl in and plug the entrance.',
        ],
      },
      {
        heading: 'Snow shelters',
        paragraphs: [
          'Snow is a good insulator. A shelter dug into or built from snow can be far warmer than the open air, because it blocks all wind.',
        ],
        steps: [
          'Snow trench: dig a body-length trench, roof it with branches or blocks, and insulate the floor.',
          'Quinzhee: pile snow into a mound, let it settle, then hollow it out from a low entrance.',
          'Always poke a ventilation hole and keep the entrance lower than your sleeping shelf.',
        ],
        warning: 'Any enclosed snow shelter must have a vent hole. Without airflow you risk suffocation or carbon monoxide buildup if you use any flame inside.',
      },
    ],
    related: ['shelter-site', 'ground-insulation', 'staying-dry', 'hypothermia'],
  },
  {
    id: 'staying-dry',
    categoryId: 'shelter',
    title: 'Staying Dry',
    summary: 'Wet clothing and bedding steal heat fast; staying dry is the single most important defense against cold.',
    emergency: false,
    severity: 1,
    keywords: ['dry', 'wet', 'rain', 'waterproof', 'hypothermia', 'clothing'],
    quickSteps: [
      'Get out of rain and wind before you get soaked.',
      'Keep at least one dry layer set aside, never worn wet.',
      'Roof and floor your shelter to shed and block water.',
      'Peel off wet clothes; dry against your skin or by a fire.',
      'Avoid sweating heavily; damp from sweat chills you too.',
    ],
    sections: [
      {
        heading: 'Why wet is dangerous',
        paragraphs: [
          'Wet clothing pulls heat from your body many times faster than dry clothing. Being wet in wind or cold is the fastest path to hypothermia, which can happen even in mild temperatures.',
          'Staying dry is more important than being warm at the start. Once you are soaked, warming up is much harder.',
        ],
      },
      {
        heading: 'Shed water and block it from below',
        paragraphs: [
          'Rain comes from above, but ground water soaks up from below. Guard against both.',
        ],
        steps: [
          'Roof your shelter so water runs off, layering cover from the bottom up like shingles.',
          'Raise or insulate your bed so you do not lie in a puddle or on damp earth.',
          'Dig a small channel around the shelter to divert running water away.',
          'Use a tarp, poncho, bark, or large leaves as a rain layer if you have them.',
        ],
      },
      {
        heading: 'Manage your clothing',
        paragraphs: [
          'Your clothes are your first shelter. Protect a dry set and manage the ones you wear.',
        ],
        steps: [
          'Keep one dry layer in reserve, wrapped or protected, for sleeping.',
          'Take off wet outer layers when you can; wring them and dry them by fire or body heat.',
          'Do not overdress while working or walking. Sweat soaks you from the inside.',
          'Vent or remove layers before you sweat, and add them back when you rest.',
        ],
        warning: 'If someone is wet, shivering hard, confused, or clumsy, treat for hypothermia at once. Get them dry, insulated from the ground, and warmed at the core.',
      },
    ],
    related: ['shelter-site', 'ground-insulation', 'shelter-types', 'hypothermia'],
  },
];
