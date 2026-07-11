export default [
  {
    id: 'hypothermia',
    categoryId: 'cold-heat',
    title: 'Hypothermia',
    summary: 'Your body is losing heat faster than it can make it, and your core is getting dangerously cold.',
    emergency: true,
    severity: 1,
    keywords: ['too cold', 'shivering', 'freezing', 'cold exposure', 'low body temperature', 'confused and cold'],
    quickSteps: [
      'Get the person out of wind, rain, and cold. Move gently.',
      'Remove wet clothing and replace with dry layers or wrap in blankets.',
      'Cover the head and neck. Insulate them from the ground underneath.',
      'Give warm sweet drinks only if they are fully awake and can swallow.',
      'For severe cold with confusion or no shivering, handle very gently and get emergency help.',
    ],
    sections: [
      {
        heading: 'Signs to look for',
        paragraphs: [
          'Mild: shivering, cold and pale skin, clumsy hands, stumbling, slow or slurred speech, and mild confusion.',
          'Severe: shivering stops, muscles go stiff, the person is drowsy, confused, or will not wake properly. Breathing and pulse slow down.',
        ],
        warning: 'When shivering stops but the person is still cold, this is a serious sign. It means the body can no longer warm itself. Treat as an emergency.',
      },
      {
        heading: 'What to do',
        paragraphs: [
          'The goal is to stop further heat loss and warm the person slowly.',
        ],
        steps: [
          'Shelter them from wind, rain, and snow.',
          'Take off wet clothes. Put on dry ones or wrap them in blankets, coats, or a sleeping bag.',
          'Put insulation under them. The cold ground steals heat fast.',
          'Cover the head and neck, leaving the face clear.',
          'Skin to skin contact under blankets, from a warm person, can help.',
          'If fully alert, give warm, sweet, non-alcoholic drinks.',
        ],
      },
      {
        heading: 'What NOT to do',
        paragraphs: [
          'Do not rub or massage the arms and legs. This can push cold blood to the heart and cause a dangerous heart rhythm.',
          'Do not put someone in a hot bath or against very hot objects. Warm gently, not fast.',
          'Do not give alcohol. It makes heat loss worse.',
          'Do not make a severely cold person walk or exert themselves if avoidable. Move them gently and keep them lying flat.',
        ],
      },
      {
        heading: 'When it is an emergency',
        paragraphs: [
          'Call for emergency help if the person is confused, very drowsy, stops shivering, or will not wake.',
          'A severely cold person may seem lifeless but still be alive. Keep warming and, if they are not breathing, begin CPR and continue until help arrives.',
        ],
        warning: 'A cold body can survive longer without a pulse than a warm one. Do not give up on a severely hypothermic person too soon.',
      },
      {
        heading: 'Prevention',
        paragraphs: [
          'Stay dry. Wet clothing pulls heat away many times faster than dry.',
          'Wear layers you can add or remove. Cover your head and hands.',
          'Eat and drink regularly. Your body needs fuel to make heat.',
          'Get out of wind and get off cold ground when you rest.',
        ],
      },
    ],
    related: ['frostbite', 'shelter-types', 'ground-insulation', 'staying-dry', 'cpr'],
  },
  {
    id: 'frostbite',
    categoryId: 'cold-heat',
    title: 'Frostbite',
    summary: 'Skin and the tissue under it have frozen, most often on fingers, toes, ears, nose, or cheeks.',
    emergency: false,
    severity: 2,
    keywords: ['frozen skin', 'numb fingers', 'white skin', 'cold toes', 'frostnip', 'frozen toes'],
    quickSteps: [
      'Get out of the cold and into shelter.',
      'Remove anything tight or wet from the area, including rings.',
      'Warm the part gently with body heat, for example hands in the armpits.',
      'Do not rub the skin and do not use direct high heat.',
      'Do not thaw the part if it might freeze again before you reach help.',
    ],
    sections: [
      {
        heading: 'Signs to look for',
        paragraphs: [
          'Early (frostnip): cold, red skin that then goes pale, with pins and needles or numbness. This stage is reversible.',
          'Frostbite: skin looks white, grey, or waxy and feels hard, cold, and numb.',
          'As it thaws, the area may become red, swollen, painful, and can blister.',
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Warm the area slowly and protect it from further harm.',
        ],
        steps: [
          'Move into shelter and warmth.',
          'Take off wet or tight items and any jewellery before swelling starts.',
          'Warm the part with steady body heat, or soak in warm water at about 37 to 39 degrees Celsius (99 to 102 degrees Fahrenheit). It should feel warm, not hot, to a normal hand.',
          'Rewarming is done when the skin is soft and looks red or purple, often after about 30 minutes.',
          'Pad between fingers and toes and protect the area from knocks.',
        ],
      },
      {
        heading: 'What NOT to do',
        paragraphs: [
          'Do not rub the area, and never rub it with snow. This tears the frozen tissue.',
          'Do not use a fire, stove, heater, or hot water bottle directly on the skin. Numb skin burns easily.',
          'Do not walk on frostbitten feet unless you have no choice to reach safety.',
          'Do not break any blisters.',
        ],
        warning: 'Do not thaw a frozen part if there is any chance it will freeze again before you get help. Refreezing thawed tissue causes far worse damage than staying frozen a while longer.',
      },
      {
        heading: 'After warming and getting help',
        paragraphs: [
          'Deep frostbite needs medical care. Seek help as soon as you safely can.',
          'Keep the area clean, dry, and protected while you travel.',
          'Frostbitten areas stay sensitive to cold for a long time. Keep them extra warm in future.',
        ],
      },
    ],
    related: ['hypothermia', 'staying-dry', 'shelter-types', 'wounds-infection'],
  },
  {
    id: 'heat-exhaustion',
    categoryId: 'cold-heat',
    title: 'Heat Exhaustion',
    summary: 'The body is overheating and losing too much water and salt through heavy sweating.',
    emergency: false,
    severity: 2,
    keywords: ['overheated', 'heavy sweating', 'dizzy in heat', 'faint', 'hot and weak', 'heat sickness'],
    quickSteps: [
      'Move the person into shade or a cool place at once.',
      'Sit or lie them down and loosen tight clothing.',
      'Cool them: wet skin, fan them, put cool packs on the neck, armpits, and groin.',
      'Give small, frequent sips of water.',
      'They should feel better within 30 minutes. If not, treat as heatstroke and get help.',
    ],
    sections: [
      {
        heading: 'Signs to look for',
        paragraphs: [
          'Heavy sweating with cool, pale, clammy skin.',
          'Tiredness, weakness, dizziness, or headache.',
          'Feeling sick, muscle cramps, and strong thirst.',
          'A fast, weak pulse. The person stays awake and knows where they are.',
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Cool the person and replace fluid.',
        ],
        steps: [
          'Get them out of the sun into shade or a cool room.',
          'Lie them down and raise their legs a little.',
          'Loosen or remove extra clothing.',
          'Wet the skin, fan them, and place cool damp cloths on the neck, armpits, and groin.',
          'Give sips of water, a little at a time. A drink with a pinch of salt and some sugar helps if you have it.',
        ],
      },
      {
        heading: 'When it becomes an emergency',
        paragraphs: [
          'Watch closely. Heat exhaustion can turn into heatstroke, which is life threatening.',
          'Call for emergency help if the person becomes confused, stops sweating, has hot dry skin, vomits repeatedly, or loses consciousness.',
        ],
        warning: 'If the person is not clearly better within 30 minutes, or gets worse, treat it as heatstroke and get emergency help now.',
      },
      {
        heading: 'Prevention',
        paragraphs: [
          'Drink water regularly in the heat, before you feel thirsty.',
          'Rest in shade during the hottest hours. Wear a hat and loose, light clothing.',
          'Take it easy. Heavy work in strong heat is dangerous.',
        ],
      },
    ],
    related: ['heatstroke', 'dehydration', 'sunburn', 'shock'],
  },
  {
    id: 'heatstroke',
    categoryId: 'cold-heat',
    title: 'Heatstroke',
    summary: 'The body has overheated so much it can no longer control its temperature. This is life threatening.',
    emergency: true,
    severity: 1,
    keywords: ['heat stroke', 'hot dry skin', 'confused in heat', 'collapse heat', 'very hot body', 'sunstroke'],
    quickSteps: [
      'Call for emergency help straight away.',
      'Move the person into shade or a cool place.',
      'Cool them fast: soak the whole body in cool water if possible, or cover with cool wet cloths.',
      'Put cold packs on the neck, armpits, and groin, and keep fanning.',
      'Do not give drinks if they are confused or not fully awake.',
      'If they stop breathing, begin CPR.',
    ],
    sections: [
      {
        heading: 'Signs to look for',
        paragraphs: [
          'A very hot body. Skin may be hot and dry, or still sweaty.',
          'Confusion, strange behaviour, slurred speech, or agitation. This change in the mind is the key warning sign.',
          'Headache, fast breathing, a pounding heart, and feeling sick.',
          'The person may have a seizure, collapse, or become unresponsive.',
        ],
        warning: 'Confusion or a change in behaviour in a hot person means heatstroke until proven otherwise. Act at once. Every minute of overheating causes more harm.',
      },
      {
        heading: 'What to do',
        paragraphs: [
          'The priority is to cool the body as fast as possible while help is on the way.',
        ],
        steps: [
          'Call emergency services first, or send someone to call.',
          'Move them out of the heat into shade or indoors.',
          'Best method: immerse the body up to the neck in cool water, for example a stream, tub, or pool, keeping the head above water.',
          'If you cannot immerse them, drench them with cool water, cover with wet sheets, and fan hard.',
          'Add cold packs or cold wet cloths to the neck, armpits, and groin.',
          'Keep cooling until they are no longer confused or help takes over.',
        ],
      },
      {
        heading: 'What NOT to do',
        paragraphs: [
          'Do not wait to see if they improve. Cool now and call for help now.',
          'Do not give drinks to anyone who is confused, drowsy, or not fully awake. They may choke.',
          'Do not give medicines for fever. They do not help heatstroke.',
        ],
      },
      {
        heading: 'If they lose consciousness',
        paragraphs: [
          'If unresponsive but breathing, place them on their side in the recovery position and keep cooling.',
          'If they are not breathing normally, start CPR and continue until help arrives.',
        ],
      },
    ],
    related: ['heat-exhaustion', 'dehydration', 'cpr', 'recovery-position', 'seizures'],
  },
  {
    id: 'sunburn',
    categoryId: 'cold-heat',
    title: 'Sunburn',
    summary: 'Skin has been burned by the sun and is red, sore, and hot to the touch.',
    emergency: false,
    severity: 3,
    keywords: ['burnt skin', 'red skin', 'sun burn', 'peeling', 'sore skin from sun'],
    quickSteps: [
      'Get out of the sun and into shade or cover up.',
      'Cool the skin with cool water or cool damp cloths for a while.',
      'Drink extra water. Sunburn dries you out.',
      'Leave any blisters unbroken and cover them loosely.',
      'Keep the burned skin covered from the sun until it heals.',
    ],
    sections: [
      {
        heading: 'Signs to look for',
        paragraphs: [
          'Skin that is red, warm, tender, and sore, often a few hours after sun exposure.',
          'Tight, itchy skin that may later peel.',
          'Bad sunburn can blister and be very painful.',
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Cool and protect the skin and replace lost fluid.',
        ],
        steps: [
          'Move into shade and cover the burned skin.',
          'Cool it with cool, not icy, water or damp cloths.',
          'Drink extra water.',
          'Apply aloe vera or a gentle moisturiser if you have it.',
          'Leave blisters alone. If one bursts, keep it clean and cover loosely.',
        ],
      },
      {
        heading: 'What to avoid',
        paragraphs: [
          'Do not use ice directly on the skin. It can cause more damage.',
          'Do not use greasy butter or oils on the burn.',
          'Do not pop blisters or peel loose skin.',
          'Do not go back into the sun on burned skin without covering it.',
        ],
      },
      {
        heading: 'When to seek help',
        paragraphs: [
          'Get medical help if there is widespread blistering, a fever, chills, severe pain, dizziness, or confusion. These can mean a serious burn or heat illness.',
        ],
      },
      {
        heading: 'Prevention',
        paragraphs: [
          'Cover up with clothing, a wide hat, and sunglasses.',
          'Stay in shade during the strongest sun, around midday.',
          'Use sunscreen if you have it and reapply often, including on cloudy days and near water, snow, or sand, which reflect the sun.',
        ],
      },
    ],
    related: ['heat-exhaustion', 'heatstroke', 'dehydration', 'burns'],
  },
];
