export default [
  {
    id: 'snake-bite',
    categoryId: 'animals-plants',
    title: 'Snake Bite',
    summary: 'Keep the person still and calm, keep the bitten limb from moving, and get to medical help fast.',
    emergency: true,
    severity: 1,
    keywords: ['bitten', 'snake', 'venom', 'bite', 'poison', 'fang'],
    quickSteps: [
      'Move away from the snake. Do not try to catch or kill it.',
      'Keep the person still and calm. Movement spreads venom faster.',
      'Keep the bitten limb still and at or below heart level.',
      'Remove rings, watches, and tight clothing near the bite before it swells.',
      'Get to medical help as fast as possible. Note the time of the bite.',
    ],
    sections: [
      {
        heading: 'What to do first',
        steps: [
          'Step back out of the snake reach so it cannot bite again.',
          'Sit the person down and keep them as still and calm as you can.',
          'Keep the bitten arm or leg still, using a splint or sling if you have one, and rest it at or below the level of the heart.',
          'Gently take off any rings, watches, bracelets, or tight clothes near the bite before swelling starts.',
          'Note the time of the bite and watch for spreading redness, swelling, or trouble breathing.',
          'Get to a hospital or call for help right away. Antivenom is the real treatment.',
        ],
      },
      {
        heading: 'What NOT to do',
        paragraphs: [
          'Old snake bite methods do more harm than good. Follow the do-not list carefully.',
        ],
        steps: [
          'Do not cut the wound or try to suck out the venom.',
          'Do not apply a tight tourniquet that cuts off blood flow.',
          'Do not put ice on the bite.',
          'Do not give alcohol, caffeine, or medicines unless told to by a professional.',
          'Do not waste time chasing the snake. A photo from a safe distance is enough if it is easy.',
        ],
      },
      {
        heading: 'Regional difference: pressure immobilisation',
        paragraphs: [
          'In Australia and some other regions, first aid for certain snake bites uses a pressure immobilisation bandage. A wide bandage is wrapped firmly over the bite and up the whole limb, and the limb is splinted still. This slows venom that travels through the lymph system.',
          'In North America this is generally not advised for pit viper bites (rattlesnakes, copperheads, cottonmouths) because it can worsen local tissue damage. Follow the guidance for your region.',
          'If you are unsure which applies, the safe universal steps are the same: keep still, keep the limb still, and get to medical help fast.',
        ],
        warning: 'Even if you feel fine at first, venom effects can be delayed. Always get checked by a professional after any bite from a snake you cannot confirm is harmless.',
      },
      {
        heading: 'When it is a true emergency',
        paragraphs: [
          'Trouble breathing, drooping eyelids, difficulty swallowing, severe pain, heavy swelling, bleeding that will not stop, fainting, or confusion all mean a serious envenomation.',
          'Treat these as life-threatening. Get emergency help immediately and be ready to give rescue breaths or start CPR if the person stops breathing.',
        ],
      },
    ],
    related: ['anaphylaxis', 'shock', 'severe-bleeding', 'staying-oriented'],
  },
  {
    id: 'insect-stings',
    categoryId: 'animals-plants',
    title: 'Insect Stings',
    summary: 'Most stings only hurt, but a severe allergic reaction is a life-threatening emergency.',
    emergency: true,
    severity: 1,
    keywords: ['sting', 'bee', 'wasp', 'hornet', 'allergy', 'anaphylaxis', 'stinger'],
    quickSteps: [
      'Move away from the nest or swarm to avoid more stings.',
      'Scrape a bee stinger out sideways with a card or fingernail. Do not pinch it.',
      'Wash the area and apply something cold to ease pain and swelling.',
      'Watch closely for a severe allergic reaction over the next hour.',
      'If breathing, face, or throat are affected, treat as an emergency and use an adrenaline pen if available.',
    ],
    sections: [
      {
        heading: 'Treating a normal sting',
        steps: [
          'Get clear of the area so you are not stung again. Wasps and hornets can sting many times.',
          'If a bee left a stinger, scrape it out sideways with a fingernail, knife edge, or card. Removing it fast means less venom.',
          'Do not squeeze the stinger with fingers or tweezers. That pushes in more venom.',
          'Wash the sting with clean water and apply a cold, damp cloth to reduce pain and swelling.',
          'Raise the stung arm or leg if you can, and try not to scratch it.',
        ],
      },
      {
        heading: 'Recognising a severe reaction',
        paragraphs: [
          'A severe allergic reaction, called anaphylaxis, is a medical emergency and can happen within minutes.',
          'Warning signs include swelling of the face, lips, tongue, or throat, difficulty breathing or wheezing, a tight throat, widespread hives, dizziness, fainting, or a fast weak pulse.',
        ],
        warning: 'Anaphylaxis can kill in minutes. If you see these signs, act at once. Do not wait to see if it passes.',
      },
      {
        heading: 'What to do for anaphylaxis',
        steps: [
          'Get emergency help immediately.',
          'If the person has an adrenaline auto-injector (such as an EpiPen), help them use it right away into the outer thigh muscle.',
          'Do not hesitate. If you are unsure whether it is anaphylaxis, using the pen will not harm them and may save their life.',
          'Help them sit up if breathing is hard, or lie flat with legs raised if they feel faint.',
          'A second dose may be needed after 5 to 15 minutes if there is no improvement and one is available.',
          'Even if they recover, they must be seen by a professional, because symptoms can return.',
        ],
      },
      {
        heading: 'Avoiding stings',
        paragraphs: [
          'Stay away from nests and hives. Do not swat wildly, which can provoke a swarm. Move away calmly.',
          'Cover food and sweet drinks outdoors, avoid strong scents, and check before putting on shoes or reaching into hollows.',
        ],
      },
    ],
    related: ['anaphylaxis', 'shock', 'ticks', 'dangerous-animals'],
  },
  {
    id: 'ticks',
    categoryId: 'animals-plants',
    title: 'Ticks',
    summary: 'Remove an attached tick promptly and straight out to lower the risk of tick-borne disease.',
    emergency: false,
    severity: 3,
    keywords: ['tick', 'bite', 'lyme', 'disease', 'remove', 'tweezers', 'rash'],
    quickSteps: [
      'Check your skin, scalp, and folds after being in grass or woodland.',
      'Grip the tick with fine tweezers as close to the skin as possible.',
      'Pull straight out with steady, even pressure. Do not twist or jerk.',
      'Clean the bite and your hands afterward.',
      'Watch the bite for weeks for a spreading rash or fever, and get checked if they appear.',
    ],
    sections: [
      {
        heading: 'Checking for ticks',
        paragraphs: [
          'Ticks are tiny and often painless, so you may not feel one. After walking through grass, brush, or woods, check your whole body.',
          'Look carefully in warm hidden areas: behind the knees, in the groin, under arms, around the waist, in the belly button, behind the ears, and along the hairline and scalp.',
        ],
      },
      {
        heading: 'Removing a tick correctly',
        steps: [
          'Use clean, fine-tipped tweezers. Grasp the tick as close to your skin as you can, right at the mouthparts.',
          'Pull upward with steady, even pressure. Do not twist, jerk, or wiggle it.',
          'If the mouthparts break off and stay in the skin, remove them with tweezers if easy, or leave them to heal out on their own.',
          'Wash the bite and your hands with soap and water, or use an antiseptic.',
          'If you want, save the tick in a sealed bag or take a photo in case a doctor needs to identify it.',
        ],
        warning: 'Do not use heat, a match, petroleum jelly, or nail polish to make a tick let go. These old methods can make it release more infected fluid into the wound.',
      },
      {
        heading: 'Watch for illness afterward',
        paragraphs: [
          'Some ticks carry diseases such as Lyme disease. Removing a tick quickly, within a day, greatly lowers the risk of infection.',
          'For several weeks after a bite, watch for a spreading circular rash, especially one shaped like a target, plus fever, aches, tiredness, or headaches.',
          'If any of these appear, seek medical care and mention the tick bite. Tick-borne illnesses are treatable, especially when caught early.',
        ],
      },
    ],
    related: ['insect-stings', 'wounds-infection', 'safe-plants'],
  },
  {
    id: 'dangerous-animals',
    categoryId: 'animals-plants',
    title: 'Dangerous Animals',
    summary: 'Most animals avoid people, so give them space, do not corner them, and never come between a mother and young.',
    emergency: false,
    severity: 2,
    keywords: ['bear', 'animal', 'wildlife', 'predator', 'attack', 'defend', 'dangerous'],
    quickSteps: [
      'Keep your distance. Most animals attack only when surprised or cornered.',
      'Never get between an animal and its young or its food.',
      'Back away slowly. Do not turn your back or run from a predator.',
      'Make yourself look large and make noise if an animal approaches.',
      'Store food away from where you sleep so animals are not drawn in.',
    ],
    sections: [
      {
        heading: 'Avoiding trouble',
        paragraphs: [
          'Nearly all wild animals prefer to avoid people. Most attacks happen when an animal is surprised, feels cornered, is protecting young, or is guarding food.',
          'Make noise as you move through thick country so you do not startle anything. Watch for tracks, droppings, and dens, and keep well clear of them.',
        ],
      },
      {
        heading: 'If a large animal approaches',
        steps: [
          'Stay calm and face the animal. Do not scream or make sudden moves.',
          'Back away slowly and give it a clear escape route. A cornered animal is far more likely to attack.',
          'Do not turn your back or run. Running can trigger a chase, and you cannot outrun most animals.',
          'For most large predators, make yourself look big: raise your arms or a jacket, stand tall, and speak in a firm, low voice.',
          'Pick up small children and keep any group together and close.',
        ],
        warning: 'Responses differ by animal and region. For some bears you stand your ground and fight back if attacked, for others you play dead. Learn the animals of your area before you travel.',
      },
      {
        heading: 'Protecting your camp',
        paragraphs: [
          'Keep all food, rubbish, and strong-smelling items away from where you sleep, ideally sealed and hung or stored well away from camp.',
          'Cook and eat away from your sleeping area, and keep it clean. A camp that smells of food invites animals in during the night.',
        ],
      },
    ],
    related: ['snake-bite', 'insect-stings', 'staying-oriented'],
  },
  {
    id: 'safe-plants',
    categoryId: 'animals-plants',
    title: 'Plants to Avoid',
    summary: 'Learn to spot and steer clear of harmful plants, because touching or eating the wrong one can be serious.',
    emergency: false,
    severity: 3,
    keywords: ['plants', 'poison', 'ivy', 'toxic', 'rash', 'avoid', 'berries'],
    quickSteps: [
      'When unsure, do not touch and do not eat it.',
      'Avoid plants with milky sap, thorns, or a bitter, soapy taste.',
      'Learn the local poison ivy, oak, or sumac and their leaf shapes.',
      'If you touch a rash-causing plant, wash the skin with lots of water and soap.',
      'Never eat wild berries or mushrooms you cannot positively identify.',
    ],
    sections: [
      {
        heading: 'General warning signs',
        paragraphs: [
          'No single rule marks every poisonous plant, but some features are common warnings. Be cautious of plants with milky or coloured sap, a bitter or soapy taste, tiny hairs or spines, or an almond-like smell.',
          'Also avoid beans or seeds in pods, and any plant with a three-leaf growth pattern, which is common in rash-causing plants.',
        ],
        warning: 'These are warnings, not proof. Some safe foods share these traits and some deadly plants have none. When in doubt, leave it alone.',
      },
      {
        heading: 'Skin-irritating plants',
        paragraphs: [
          'Poison ivy, poison oak, and poison sumac cause an itchy, blistering rash from an oil on the plant. A common reminder is leaves of three, let it be.',
          'Some plants like giant hogweed cause severe burns when the sap meets skin in sunlight. Learn the harmful plants of the area you are in.',
        ],
        steps: [
          'If you touch a rash-causing plant, wash the skin as soon as possible with plenty of cool water and soap.',
          'Rinse anything else that touched it: clothes, tools, and gear, since the oil spreads.',
          'Do not scratch or burst blisters, and keep the area clean to avoid infection.',
        ],
      },
      {
        heading: 'Do not gamble on food',
        paragraphs: [
          'You can survive for weeks without food, so there is never a good reason to risk eating an unknown plant, berry, or mushroom.',
          'A single toxic mushroom or berry can cause organ failure or death, sometimes with a delay of a day or more before symptoms appear. The risk is not worth it.',
        ],
        warning: 'Never eat any wild plant, berry, or fungus you cannot positively identify as safe. When in doubt, do not eat it.',
      },
    ],
    related: ['foraging-safety', 'finding-food', 'ticks'],
  },
];
