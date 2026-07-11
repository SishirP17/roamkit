export default [
  {
    id: 'severe-bleeding',
    categoryId: 'first-aid',
    title: 'Severe Bleeding',
    summary: 'Heavy bleeding that will not stop can kill fast, so press hard on the wound right away and keep pressing.',
    emergency: true,
    severity: 1,
    keywords: ['blood', 'bleeding', 'cut', 'wound', 'cant stop bleeding', 'gushing blood', 'lost a lot of blood', 'deep cut', 'stab', 'hemorrhage', 'artery'],
    quickSteps: [
      'Call emergency services now, or tell someone to call.',
      'Press hard on the wound with a cloth, pad, or your bare hand.',
      'Keep pressing without stopping. Do not lift to peek.',
      'If blood soaks through, add more cloth on top and keep pressing.',
      'Lay the person down and keep them warm.',
      'If bleeding is from an arm or leg and will not stop, use a tourniquet if you have one and are able.',
    ],
    sections: [
      {
        heading: 'What to do',
        paragraphs: [
          'The most important thing is firm, constant pressure straight onto the wound. Pressure is what stops the blood.',
          'Use a clean cloth, a bandage, or clothing. If you have nothing, use your bare hand. Do not waste time looking for the perfect item.',
        ],
        steps: [
          'Push down hard, right on the bleeding point, with the whole flat of your hand.',
          'Hold that pressure for at least 10 minutes without letting go.',
          'If you can, raise the injured part above the level of the heart while you press.',
          'Wrap a bandage firmly over the pad to hold the pressure once bleeding slows.',
        ],
        warning: 'Do not remove a cloth once blood has soaked it. Taking it off can rip away the clot and start the bleeding again. Add fresh cloth on top instead.',
      },
      {
        heading: 'If bleeding will not stop',
        paragraphs: [
          'For life-threatening bleeding from an arm or leg that direct pressure does not control, a tourniquet can save a life.',
          'A shop-bought (commercial) tourniquet is best. In a true emergency a wide strip of cloth with a strong stick to twist it can work.',
        ],
        steps: [
          'Place the tourniquet on bare skin about 5 to 8 cm (2 to 3 inches) above the wound, not on a joint.',
          'Tighten it until the bleeding stops. This will hurt, and that is expected.',
          'Write down the time you put it on if you can.',
        ],
        warning: 'Once a tourniquet is on, do not loosen or remove it. Only a medical professional should take it off.',
      },
      {
        heading: 'Watch for shock',
        paragraphs: [
          'Losing a lot of blood can send the body into shock, which is life-threatening on its own.',
          'Signs include pale, cold, clammy skin, fast breathing, confusion, and feeling faint.',
        ],
        steps: [
          'Lay the person flat and raise their legs a little if no leg is injured.',
          'Cover them with a coat or blanket to keep them warm.',
          'Do not give them food or drink.',
          'Keep talking to them and keep checking their breathing until help arrives.',
        ],
      },
    ],
    related: ['shock', 'wounds-infection', 'order-of-action', 'stay-calm'],
  },
  {
    id: 'cpr',
    categoryId: 'first-aid',
    title: 'CPR',
    summary: 'If someone is not breathing and not responding, pushing hard and fast on their chest keeps blood moving until help arrives.',
    emergency: true,
    severity: 1,
    keywords: ['cpr', 'not breathing', 'no pulse', 'chest compressions', 'heart stopped', 'collapsed', 'unresponsive', 'resuscitation', 'they wont wake up', 'cardiac arrest'],
    quickSteps: [
      'Check for response and normal breathing. Tap and shout.',
      'If no normal breathing, call emergency services and get an AED if one is near.',
      'Put the heel of your hand in the center of the chest, other hand on top.',
      'Push hard and fast, about 5 cm (2 inches) deep, 100 to 120 times a minute.',
      'Let the chest come all the way back up between each push.',
      'Do not stop until help takes over or the person wakes.',
    ],
    sections: [
      {
        heading: 'When to start CPR',
        paragraphs: [
          'Start CPR if a person is unresponsive and not breathing, or only making occasional gasping sounds. Gasping is not normal breathing.',
          'Doing CPR when it is needed can save a life. You will not harm someone who did not need it.',
        ],
        steps: [
          'Tap their shoulders and shout, "Are you okay?"',
          'Look at the chest for 10 seconds. Is it rising and falling normally?',
          'If not, tell someone to call emergency services and fetch an AED. If you are alone, call yourself, on speaker if you can.',
        ],
      },
      {
        heading: 'How to give chest compressions',
        paragraphs: [
          'Compressions are the most important part. If you are untrained or unsure about rescue breaths, giving hands-only compressions is fine and still saves lives.',
        ],
        steps: [
          'Kneel beside the person on a firm surface.',
          'Place the heel of one hand in the center of the chest, on the breastbone.',
          'Put your other hand on top and interlock your fingers.',
          'Keep your arms straight and press straight down about 5 cm (2 inches).',
          'Push at a steady 100 to 120 pushes a minute. The beat of many well known songs matches this.',
          'Let the chest rise fully between pushes without lifting your hands off.',
        ],
        warning: 'Do not stop for more than a few seconds. Every pause lets blood flow drop.',
      },
      {
        heading: 'Rescue breaths and children',
        paragraphs: [
          'If you are trained and willing, add rescue breaths: 30 compressions then 2 breaths, over and over.',
          'For a child or baby, the idea is the same but gentler. Use one hand for a child, and two fingers for a baby. Press about a third of the depth of the chest.',
          'For a baby or child, and for drowning, giving breaths matters more, so start with 5 rescue breaths if you are able.',
        ],
        steps: [
          'For a breath, tilt the head back, lift the chin, pinch the nose, and blow into the mouth until the chest rises.',
          'Give each breath over about 1 second.',
        ],
      },
      {
        heading: 'Using an AED',
        paragraphs: [
          'An AED (automated external defibrillator) is a machine that can restart a heart. Anyone can use one. It talks you through each step.',
        ],
        steps: [
          'Turn it on and follow the spoken instructions.',
          'Stick the pads on bare skin as shown in the pictures.',
          'Make sure no one is touching the person while it checks the heart or gives a shock.',
          'Keep doing compressions between shocks until help arrives.',
        ],
      },
    ],
    related: ['choking', 'drowning', 'recovery-position', 'order-of-action'],
  },
  {
    id: 'choking',
    categoryId: 'first-aid',
    title: 'Choking',
    summary: 'When something blocks the airway and a person cannot breathe or speak, back blows and abdominal thrusts can pop it out.',
    emergency: true,
    severity: 1,
    keywords: ['choking', 'cant breathe', 'food stuck', 'blocked airway', 'heimlich', 'gagging', 'something in throat', 'clutching throat', 'turning blue'],
    quickSteps: [
      'Ask, "Are you choking?" If they cannot speak, cough, or breathe, act now.',
      'Lean them forward and give up to 5 firm blows between the shoulder blades.',
      'If that fails, give up to 5 abdominal thrusts (inward and upward under the ribs).',
      'Keep swapping between 5 back blows and 5 thrusts.',
      'Call emergency services if the blockage does not clear quickly.',
      'If they go limp and stop breathing, start CPR.',
    ],
    sections: [
      {
        heading: 'Tell mild from severe',
        paragraphs: [
          'If the person can cough, speak, or breathe, the blockage is mild. Encourage them to keep coughing. Coughing is the best way to shift it.',
          'If they cannot cough, speak, or breathe, or they clutch their throat and go quiet, it is severe. You must act at once.',
        ],
      },
      {
        heading: 'Back blows and abdominal thrusts',
        paragraphs: [
          'This is for an adult or a child over 1 year old.',
        ],
        steps: [
          'Stand to the side and slightly behind. Support their chest with one hand and lean them well forward.',
          'Give up to 5 sharp blows between the shoulder blades with the heel of your hand.',
          'Check the mouth after each blow to see if the object came out.',
          'If back blows fail, stand behind them and wrap your arms around their waist.',
          'Make a fist just above the belly button, grab it with your other hand, and pull sharply inward and upward, up to 5 times.',
          'Keep repeating 5 back blows then 5 thrusts until it clears or help arrives.',
        ],
        warning: 'Do not do abdominal thrusts on a baby under 1 year or on a pregnant person. See below.',
      },
      {
        heading: 'Babies and pregnant people',
        paragraphs: [
          'A baby under 1 year needs a gentler method, and pregnant or large people need chest thrusts instead of abdominal thrusts.',
        ],
        steps: [
          'For a baby: lay them face down along your forearm, head low, and give 5 back blows. Then turn them face up and give 5 chest thrusts with two fingers on the breastbone.',
          'For a pregnant or very large person: give chest thrusts. Put your fist on the center of the breastbone and pull sharply inward.',
          'Call emergency services if the object does not come out fast.',
        ],
      },
      {
        heading: 'After it clears',
        paragraphs: [
          'Even after the blockage comes out, the person may need to be checked.',
        ],
        steps: [
          'Get medical advice if abdominal thrusts or chest thrusts were used, as they can cause internal injury.',
          'Watch for a lasting cough or trouble breathing, and seek help if it continues.',
        ],
      },
    ],
    related: ['cpr', 'recovery-position', 'order-of-action', 'stay-calm'],
  },
  {
    id: 'burns',
    categoryId: 'first-aid',
    title: 'Burns',
    summary: 'Cool a burn under running water for at least 20 minutes and never put anything greasy on it.',
    emergency: false,
    severity: 2,
    keywords: ['burn', 'scald', 'burnt', 'hot water', 'fire burn', 'blister', 'sunburn', 'chemical burn', 'steam burn'],
    quickSteps: [
      'Stop the burning. Move away from the heat, flame, or hot liquid.',
      'Cool the burn under cool running water for at least 20 minutes.',
      'Take off rings, watches, and tight clothing near the burn before it swells.',
      'Cover the burn loosely with cling film or a clean, non-fluffy cloth.',
      'Do not burst blisters or put on creams, butter, or ice.',
      'Get medical help for large, deep, or facial burns.',
    ],
    sections: [
      {
        heading: 'Cool the burn',
        paragraphs: [
          'Cooling is the single most helpful thing. It stops the burn going deeper and eases pain.',
          'Use cool or lukewarm running water, not ice cold water, for at least 20 minutes. Do this even if some time has already passed.',
        ],
        steps: [
          'Hold the burn under a gently running tap, shower, or poured water.',
          'Keep the rest of the person warm with a blanket, since long cooling can chill them.',
          'After cooling, cover the burn loosely with cling film laid over it, or a clean plastic bag for a hand or foot.',
        ],
        warning: 'Never use ice, iced water, butter, oil, toothpaste, or creams. They trap heat or cause damage and infection.',
      },
      {
        heading: 'When a burn is an emergency',
        paragraphs: [
          'Some burns always need a hospital or emergency services.',
        ],
        steps: [
          'Get emergency help for burns to the face, hands, feet, or genitals.',
          'Get help for any burn larger than the palm of the hand, or one that looks white, brown, or charred.',
          'Get help for all burns on a baby or young child, and for electrical or chemical burns.',
          'Call emergency services if the person breathed in smoke or has a burn around the mouth or throat.',
        ],
      },
      {
        heading: 'Chemical and electrical burns',
        paragraphs: [
          'These need special care because harm can be hidden or ongoing.',
        ],
        steps: [
          'For a chemical burn, brush off dry powder, then rinse with lots of running water for at least 20 minutes. Protect yourself from the chemical.',
          'For an electrical burn, make sure the power is off before you touch the person.',
          'These burns can be deeper than they look, so always seek medical help.',
        ],
        warning: 'Do not touch someone still in contact with an electrical source. Turn the power off first.',
      },
    ],
    related: ['wounds-infection', 'shock', 'eye-injury', 'sunburn'],
  },
  {
    id: 'shock',
    categoryId: 'first-aid',
    title: 'Shock',
    summary: 'Shock is when the body is not getting enough blood flow, and it can kill, so lay the person down and keep them warm.',
    emergency: true,
    severity: 1,
    keywords: ['shock', 'pale', 'clammy', 'fainting', 'cold sweat', 'weak pulse', 'going into shock', 'grey skin', 'dizzy after injury'],
    quickSteps: [
      'Call emergency services.',
      'Lay the person down on their back.',
      'Raise their legs above heart level if no leg is injured.',
      'Keep them warm with a coat or blanket.',
      'Do not give food or drink.',
      'Keep checking their breathing and reassure them.',
    ],
    sections: [
      {
        heading: 'What shock is and how to spot it',
        paragraphs: [
          'Shock here means the body is failing to pump enough blood to the organs. It often follows heavy bleeding, bad burns, serious injury, or a severe allergic reaction.',
          'This is a medical emergency, not just feeling shocked or upset.',
        ],
        steps: [
          'Look for pale, cold, sweaty, or clammy skin.',
          'Look for fast, shallow breathing and a fast, weak pulse.',
          'Watch for dizziness, feeling sick, thirst, yawning, or gasping.',
          'Later signs include confusion, restlessness, and drifting into unconsciousness.',
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Your aim is to keep blood flowing to the heart and brain and to treat the cause, such as stopping bleeding.',
        ],
        steps: [
          'Treat any obvious cause first, like pressing on a bleeding wound.',
          'Lay them flat and raise their legs about 30 cm (12 inches) if there is no leg or spine injury.',
          'Loosen tight clothing at the neck, chest, and waist.',
          'Cover them with a blanket or coat to keep body heat in.',
          'Stay calm, keep talking to them, and note any changes.',
        ],
        warning: 'Do not give anything to eat or drink, even if they ask, because they may need surgery or may vomit.',
      },
      {
        heading: 'If they become unresponsive',
        paragraphs: [
          'A person in shock can lose consciousness. Be ready.',
        ],
        steps: [
          'If they are unresponsive but breathing, put them in the recovery position.',
          'If they stop breathing normally, start CPR.',
          'Keep them warm and stay with them until help arrives.',
        ],
      },
    ],
    related: ['severe-bleeding', 'anaphylaxis', 'recovery-position', 'cpr'],
  },
  {
    id: 'fractures-sprains',
    categoryId: 'first-aid',
    title: 'Fractures and Sprains',
    summary: 'For a possible broken bone or bad sprain, keep the injured part still and supported and do not try to straighten it.',
    emergency: false,
    severity: 2,
    keywords: ['broken bone', 'fracture', 'sprain', 'twisted ankle', 'swollen', 'cant move arm', 'bone sticking out', 'strain', 'dislocation'],
    quickSteps: [
      'Keep the injured part still. Do not move it more than you must.',
      'Support it in the position you found it with your hands or padding.',
      'Put a cold pack wrapped in cloth on it to ease swelling.',
      'Do not try to straighten the limb or push a bone back in.',
      'Get medical help. Call emergency services for a bad break or open wound.',
    ],
    sections: [
      {
        heading: 'Telling a break from a sprain',
        paragraphs: [
          'It is often hard to tell a broken bone from a sprain or strain without an X-ray, so treat the worst case if unsure.',
          'A fracture is a broken bone. A sprain is a stretched or torn ligament, often at a joint like the ankle or wrist.',
        ],
        steps: [
          'Signs of a break: a snap sound, deep pain, swelling, odd shape, or not being able to use the part.',
          'Signs of a sprain: pain, swelling, bruising, and tenderness around a joint.',
          'If a bone is poking through the skin, treat it as a serious open fracture and call emergency services.',
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'The goal is to stop movement, ease pain, and prevent more damage.',
        ],
        steps: [
          'Tell the person to stay still and support the injury with your hands.',
          'Steady and support the limb in the position it is in, using rolled towels or clothing as padding.',
          'Apply a cold pack or a bag of frozen food wrapped in a cloth for up to 20 minutes.',
          'For an ankle or wrist sprain, remember rest, ice, gentle support, and raising it up.',
        ],
        warning: 'Do not try to straighten a deformed limb, push a broken bone back, or move a person with a suspected spine or neck injury unless they are in danger.',
      },
      {
        heading: 'Open fractures and getting help',
        paragraphs: [
          'An open fracture, where the bone breaks the skin, carries a risk of heavy bleeding and infection.',
        ],
        steps: [
          'Cover the wound with a clean pad and press gently around it, not directly on the bone.',
          'Do not press on a bone that is sticking out.',
          'Keep the person still and warm and watch for signs of shock.',
          'Call emergency services for open fractures, a suspected broken leg, hip, or back, or if the person cannot be moved safely.',
        ],
      },
    ],
    related: ['severe-bleeding', 'shock', 'head-injury', 'order-of-action'],
  },
  {
    id: 'wounds-infection',
    categoryId: 'first-aid',
    title: 'Wounds and Infection',
    summary: 'Clean a cut or graze well, cover it, and watch for redness or swelling that means it may be getting infected.',
    emergency: false,
    severity: 3,
    keywords: ['cut', 'graze', 'wound', 'infection', 'scrape', 'gash', 'pus', 'red around cut', 'infected wound', 'clean a wound', 'dressing'],
    quickSteps: [
      'Wash your hands first if you can.',
      'Rinse the wound under clean running water to remove dirt.',
      'Pat it dry and cover it with a clean plaster or dressing.',
      'Press firmly first if it is bleeding a lot.',
      'Watch over the next days for redness, swelling, heat, or pus.',
    ],
    sections: [
      {
        heading: 'Cleaning and covering a wound',
        paragraphs: [
          'Cleaning removes germs and dirt and lowers the chance of infection. This is for small cuts and grazes. Heavy bleeding needs firm pressure first.',
        ],
        steps: [
          'Wash your hands and wear gloves if you have them.',
          'Rinse the wound under clean running water. Do not use antiseptic that stings on an open wound if plain water will do.',
          'Gently clean the skin around the wound.',
          'Pat dry with a clean pad and cover with a plaster or sterile dressing.',
          'Change the dressing if it gets wet or dirty.',
        ],
        warning: 'Do not try to pull out a large object stuck deep in a wound. Leave it, pad around it, and get medical help.',
      },
      {
        heading: 'Signs a wound is infected',
        paragraphs: [
          'An infection can appear hours or days after the injury. Catching it early matters.',
        ],
        steps: [
          'Look for growing redness, swelling, warmth, and throbbing pain around the wound.',
          'Look for pus, a bad smell, or red streaks spreading from the wound.',
          'Feel for fever or a general feeling of being unwell.',
          'See a doctor if any of these appear, as antibiotics may be needed.',
        ],
      },
      {
        heading: 'When to seek medical care',
        paragraphs: [
          'Some wounds need professional cleaning, closing, or a tetanus check.',
        ],
        steps: [
          'Get help for deep cuts, wounds that gape open, or ones that will not stop bleeding.',
          'Get help for animal or human bites and for dirty or rusty puncture wounds.',
          'Ask about a tetanus jab if the wound is dirty or you are not up to date.',
          'Seek care for any wound with signs of infection.',
        ],
      },
    ],
    related: ['severe-bleeding', 'burns', 'snake-bite', 'insect-stings'],
  },
  {
    id: 'head-injury',
    categoryId: 'first-aid',
    title: 'Head Injury',
    summary: 'After a blow to the head, watch closely for warning signs like drowsiness or vomiting that mean a serious brain injury.',
    emergency: true,
    severity: 1,
    keywords: ['head injury', 'hit head', 'concussion', 'bang on head', 'knocked out', 'head trauma', 'brain injury', 'confused after fall', 'skull'],
    quickSteps: [
      'Sit or lay the person down and keep them calm and still.',
      'Put a cold pack wrapped in cloth on any bump.',
      'Watch closely for drowsiness, vomiting, confusion, or a bad headache.',
      'Call emergency services if they were knocked out or any warning sign appears.',
      'Do not let them be alone for the next 24 hours.',
    ],
    sections: [
      {
        heading: 'Emergency warning signs',
        paragraphs: [
          'Most head bumps are minor, but some cause bleeding or swelling in the brain. These signs mean you must call emergency services at once.',
        ],
        steps: [
          'Loss of consciousness, even briefly, or being hard to wake.',
          'Repeated vomiting, a worsening headache, or a seizure.',
          'Confusion, slurred speech, weakness, or strange behavior.',
          'Clear or bloody fluid from the nose or ears, or unequal pupils.',
          'Blurred vision, loss of balance, or a fit.',
        ],
        warning: 'A serious head injury can also involve the neck and spine. Keep the person still and do not move them unless they are in danger.',
      },
      {
        heading: 'Caring for a minor head injury',
        paragraphs: [
          'For a mild knock with no warning signs, care and watching are usually enough.',
        ],
        steps: [
          'Rest the person and hold a cold pack wrapped in cloth on the bump for up to 20 minutes.',
          'Give calm reassurance and let them rest quietly.',
          'Watch them closely for at least 24 hours.',
          'Wake them gently now and then if they sleep, to check they respond normally.',
        ],
      },
      {
        heading: 'Concussion',
        paragraphs: [
          'A concussion is a brain shake-up from a blow. Its signs may not appear right away and can take hours or days.',
          'Symptoms include headache, dizziness, feeling sick, confusion, blurred vision, and trouble remembering.',
        ],
        steps: [
          'Stop any sport or activity at once.',
          'Rest the brain and body and avoid screens and hard thinking for a few days.',
          'See a doctor to be checked, and get urgent help if symptoms get worse.',
        ],
      },
    ],
    related: ['fractures-sprains', 'seizures', 'recovery-position', 'shock'],
  },
  {
    id: 'anaphylaxis',
    categoryId: 'first-aid',
    title: 'Anaphylaxis',
    summary: 'A severe allergic reaction can close the airway within minutes, so use an adrenaline auto-injector and call for help at once.',
    emergency: true,
    severity: 1,
    keywords: ['allergic reaction', 'anaphylaxis', 'epipen', 'cant breathe allergy', 'swollen face', 'throat closing', 'hives', 'bee sting reaction', 'nut allergy', 'adrenaline', 'auto injector'],
    quickSteps: [
      'Call emergency services and say it is anaphylaxis.',
      'Use an adrenaline auto-injector (such as an EpiPen) right away if there is one.',
      'Hold it firmly against the outer thigh until it clicks and finishes.',
      'Help them sit up if breathing is hard, or lie down with legs raised if faint.',
      'Give a second dose after 5 to 10 minutes if there is no improvement and help has not come.',
    ],
    sections: [
      {
        heading: 'Recognizing anaphylaxis',
        paragraphs: [
          'Anaphylaxis is a severe, life-threatening allergic reaction. Common triggers are foods like nuts, insect stings, and some medicines.',
          'It can come on within minutes. The danger is swelling that blocks breathing and a sudden drop in blood pressure.',
        ],
        steps: [
          'Look for swelling of the face, lips, tongue, or throat.',
          'Listen for difficulty breathing, wheezing, or a hoarse voice.',
          'Look for a widespread red, raised, itchy rash (hives).',
          'Watch for feeling faint, pale, floppy, or a sense of doom.',
        ],
      },
      {
        heading: 'Using an adrenaline auto-injector',
        paragraphs: [
          'Adrenaline (also called epinephrine) is the key treatment. Auto-injectors such as EpiPen and Jext are made to be simple to use.',
          'Give it early. It is safer to give it than to wait.',
        ],
        steps: [
          'Take off the safety cap and follow the pictures on the device.',
          'Press the tip firmly against the outer middle of the thigh, through clothing if needed.',
          'Hold it in place for the time the device states, usually about 3 to 10 seconds.',
          'Note the time you gave it.',
          'Give a second injection after 5 to 10 minutes if there is no improvement and one is available.',
        ],
        warning: 'Always call emergency services even after adrenaline works, because the reaction can return.',
      },
      {
        heading: 'Positioning and aftercare',
        paragraphs: [
          'How you position the person can protect their breathing and blood pressure.',
        ],
        steps: [
          'If breathing is hard, help them sit up to make it easier.',
          'If they feel faint or are pale, lay them down and raise their legs.',
          'Do not stand them up or sit them up suddenly, as this can be dangerous.',
          'If they become unresponsive and stop breathing normally, start CPR.',
        ],
      },
    ],
    related: ['shock', 'cpr', 'recovery-position', 'insect-stings'],
  },
  {
    id: 'seizures',
    categoryId: 'first-aid',
    title: 'Seizures',
    summary: 'During a seizure, protect the person from injury, do not hold them down, and time how long it lasts.',
    emergency: true,
    severity: 2,
    keywords: ['seizure', 'fit', 'convulsion', 'epilepsy', 'shaking uncontrollably', 'jerking', 'fitting', 'passed out shaking', 'epileptic'],
    quickSteps: [
      'Stay calm and note the time the seizure starts.',
      'Move sharp or hard objects out of the way.',
      'Cushion their head with something soft.',
      'Do not hold them down or put anything in their mouth.',
      'When the jerking stops, turn them onto their side.',
      'Call emergency services if it lasts over 5 minutes or another follows.',
    ],
    sections: [
      {
        heading: 'What to do during a seizure',
        paragraphs: [
          'In a common seizure the person may stiffen, fall, and jerk. They are not aware and cannot control it. Your job is to keep them safe until it passes.',
        ],
        steps: [
          'Note the start time so you know how long it lasts.',
          'Clear the area of anything hard or sharp.',
          'Put something soft, like a folded coat, under their head.',
          'Loosen anything tight around their neck.',
          'Stay with them and speak calmly.',
        ],
        warning: 'Do not try to hold them still, and never put your fingers or any object in their mouth. They cannot swallow their tongue, and you could be bitten or cause harm.',
      },
      {
        heading: 'After the seizure',
        paragraphs: [
          'When the jerking stops, the person may be sleepy, confused, or upset. Be gentle and patient.',
        ],
        steps: [
          'Gently roll them onto their side into the recovery position.',
          'Check that their airway is clear and they are breathing.',
          'Stay with them until they are fully awake and aware.',
          'Reassure them calmly and tell them what happened.',
        ],
      },
      {
        heading: 'When to call emergency services',
        paragraphs: [
          'Many seizures stop on their own, but some situations always need an ambulance.',
        ],
        steps: [
          'Call if the seizure lasts longer than 5 minutes.',
          'Call if one seizure follows another without the person waking up.',
          'Call if it is their first ever seizure, or you do not know their history.',
          'Call if they are injured, hard to wake, having trouble breathing, or the seizure happened in water.',
          'Call for a seizure in a pregnant person or a very young baby.',
        ],
      },
    ],
    related: ['recovery-position', 'head-injury', 'cpr', 'stay-calm'],
  },
  {
    id: 'recovery-position',
    categoryId: 'first-aid',
    title: 'Recovery Position',
    summary: 'If someone is unresponsive but breathing, rolling them onto their side keeps their airway open and safe.',
    emergency: true,
    severity: 1,
    keywords: ['recovery position', 'unconscious but breathing', 'on their side', 'passed out', 'unresponsive', 'safe position', 'keep airway open', 'wont wake up but breathing'],
    quickSteps: [
      'Check they are unresponsive but breathing normally.',
      'Kneel beside them and straighten their legs.',
      'Roll them toward you onto their side.',
      'Tilt the head back a little so the airway stays open.',
      'Call emergency services and keep checking their breathing.',
    ],
    sections: [
      {
        heading: 'When to use it',
        paragraphs: [
          'Use the recovery position for anyone who is unconscious or not fully awake but is breathing normally on their own.',
          'Lying on the side stops the tongue blocking the throat and lets any vomit drain out instead of choking them.',
        ],
        steps: [
          'First check they respond to a shout or gentle shake, and that they are breathing normally.',
          'If they are not breathing normally, do not use this position. Start CPR instead.',
        ],
      },
      {
        heading: 'How to do it',
        paragraphs: [
          'These steps are for an adult or child. Move gently, especially if injury is possible.',
        ],
        steps: [
          'Kneel beside them. Place the arm nearest you out at a right angle, palm up.',
          'Bring the far arm across their chest and hold the back of that hand against their nearer cheek.',
          'With your other hand, pull the far knee up so the foot is flat on the ground.',
          'Pull on that knee to roll them toward you onto their side.',
          'Adjust the top leg so the hip and knee are bent at right angles.',
          'Tilt the head back gently to keep the airway open, and tuck the hand under the cheek to support it.',
        ],
      },
      {
        heading: 'While you wait',
        paragraphs: [
          'Stay with the person and keep watching them until help arrives.',
        ],
        steps: [
          'Call emergency services if not already done.',
          'Keep checking that they are still breathing normally.',
          'If breathing stops, roll them onto their back and start CPR.',
          'If a spine injury is possible, keep the head, neck, and back in line as you roll, and get extra hands to help if you can.',
        ],
        warning: 'If they have been in the recovery position on one side for 30 minutes, turn them to the other side if it is safe, to protect the lower arm.',
      },
    ],
    related: ['cpr', 'seizures', 'head-injury', 'drowning'],
  },
  {
    id: 'drowning',
    categoryId: 'first-aid',
    title: 'Drowning',
    summary: 'Get the person out of the water without putting yourself at risk, then give rescue breaths and CPR if they are not breathing.',
    emergency: true,
    severity: 1,
    keywords: ['drowning', 'pulled from water', 'not breathing water', 'near drowning', 'went under', 'water rescue', 'saved from pool', 'submerged'],
    quickSteps: [
      'Do not jump in unless you are trained. Reach or throw something that floats.',
      'Once out, check for response and normal breathing.',
      'If not breathing, call emergency services and start CPR.',
      'For drowning, give 5 rescue breaths first, then 30 compressions and 2 breaths.',
      'Keep them warm and treat for cold.',
    ],
    sections: [
      {
        heading: 'Rescue without becoming a victim',
        paragraphs: [
          'Many rescuers drown trying to save others. Your own safety comes first. Follow the order: reach, throw, row, go.',
        ],
        steps: [
          'Reach out with your arm, a stick, a pole, or an oar from land or the edge.',
          'Throw a rope or anything that floats, like a life ring or a cool box.',
          'If there is a boat and you can use it safely, row out.',
          'Only go into the water as a last resort, and only if you are trained to do so.',
        ],
        warning: 'Do not enter cold, fast, or deep water to rescue someone unless you are a trained water rescuer. Call for help instead.',
      },
      {
        heading: 'Once they are out of the water',
        paragraphs: [
          'Drowning is mainly a breathing emergency, so getting air into the lungs is the priority.',
        ],
        steps: [
          'Check for response and look for normal breathing.',
          'If they are not breathing normally, tell someone to call emergency services.',
          'Give 5 initial rescue breaths, then start CPR with 30 chest compressions and 2 breaths.',
          'Continue at 100 to 120 compressions a minute until help takes over.',
          'If they are breathing but unresponsive, put them in the recovery position.',
        ],
      },
      {
        heading: 'Aftercare and hidden danger',
        paragraphs: [
          'A person can be very cold, and breathing problems can appear later even if they seem fine.',
        ],
        steps: [
          'Remove wet clothing and cover them with dry blankets or coats to warm them.',
          'Anyone who was rescued from drowning should be seen by a doctor.',
          'Get urgent help if they later cough, struggle to breathe, or become drowsy, as water in the lungs can cause problems hours later.',
        ],
      },
    ],
    related: ['cpr', 'recovery-position', 'hypothermia', 'shock'],
  },
  {
    id: 'nosebleed',
    categoryId: 'first-aid',
    title: 'Nosebleed',
    summary: 'Lean forward and pinch the soft part of the nose for 10 to 15 minutes to stop a nosebleed.',
    emergency: false,
    severity: 3,
    keywords: ['nosebleed', 'bloody nose', 'nose bleeding', 'blood from nose', 'epistaxis', 'cant stop nosebleed'],
    quickSteps: [
      'Sit down and lean forward, not back.',
      'Pinch the soft part of the nose just below the bony bridge.',
      'Keep pinching for 10 to 15 minutes without letting go to check.',
      'Breathe through your mouth and spit out any blood.',
      'Seek help if it will not stop after 30 minutes.',
    ],
    sections: [
      {
        heading: 'How to stop it',
        paragraphs: [
          'Most nosebleeds come from small blood vessels near the front of the nose and can be stopped with steady pinching.',
        ],
        steps: [
          'Sit upright and tip your head slightly forward.',
          'Pinch the soft fleshy part of the nose, below the hard bridge, firmly with thumb and finger.',
          'Hold without releasing for 10 to 15 minutes.',
          'Breathe through your mouth and lean forward so blood does not run down your throat.',
          'A cold pack on the bridge of the nose or back of the neck may help.',
        ],
        warning: 'Do not tip the head back. Swallowed blood can make you feel sick or vomit and hides how much is being lost.',
      },
      {
        heading: 'After it stops',
        paragraphs: [
          'Once bleeding stops, gentle care helps stop it starting again.',
        ],
        steps: [
          'Do not pick or blow your nose for several hours.',
          'Avoid bending down, heavy lifting, or hot drinks for a while.',
          'If it starts again, pinch for another 10 to 15 minutes.',
        ],
      },
      {
        heading: 'When to get help',
        paragraphs: [
          'A nosebleed is rarely serious, but some need medical care.',
        ],
        steps: [
          'Seek help if bleeding does not stop after 30 minutes of pinching.',
          'Seek help if the bleeding is very heavy or you feel faint or breathless.',
          'Get checked if the nosebleed followed a blow to the head or face.',
          'Tell a doctor if you take blood thinning medicine and get frequent nosebleeds.',
        ],
      },
    ],
    related: ['head-injury', 'severe-bleeding', 'shock', 'stay-calm'],
  },
  {
    id: 'eye-injury',
    categoryId: 'first-aid',
    title: 'Eye Injury',
    summary: 'For a chemical splash rinse the eye with water for at least 15 to 20 minutes, and never rub or press an injured eye.',
    emergency: false,
    severity: 2,
    keywords: ['eye injury', 'something in eye', 'chemical in eye', 'poked eye', 'grit in eye', 'eye pain', 'foreign object eye', 'splash in eye', 'scratched eye'],
    quickSteps: [
      'For a chemical splash, rinse the eye with clean water at once.',
      'Keep rinsing for at least 15 to 20 minutes.',
      'Do not rub the eye.',
      'Do not try to remove anything stuck in the eye. Cover it and get help.',
      'Seek medical help for any serious eye injury.',
    ],
    sections: [
      {
        heading: 'Chemical in the eye',
        paragraphs: [
          'A chemical splash is always an emergency because it can damage sight fast. Rinse first, before anything else.',
        ],
        steps: [
          'Rinse the eye with clean running water straight away. Do not wait to find special fluid.',
          'Pour water from the inner corner outward so it does not flow into the other eye.',
          'Hold the eyelids open and keep rinsing for at least 15 to 20 minutes.',
          'Remove contact lenses if they do not wash out.',
          'Call emergency services or go to hospital, and take the chemical container if you can.',
        ],
        warning: 'For strong alkalis like bleach or drain cleaner, rinse for at least 30 minutes. These cause deep damage.',
      },
      {
        heading: 'Something in the eye',
        paragraphs: [
          'Loose grit or an eyelash can often be washed out. Anything stuck in or on the eye must be left alone.',
        ],
        steps: [
          'For loose dust or grit, blink several times, then rinse with clean water or saline.',
          'Do not rub the eye, as this can scratch it.',
          'If an object is stuck in the eye or on the colored part, do not try to remove it.',
          'Cover the eye lightly without pressing on it and get medical help.',
        ],
      },
      {
        heading: 'Blows and cuts to the eye',
        paragraphs: [
          'A knock or cut to the eye can cause hidden damage. Treat it with care.',
        ],
        steps: [
          'Rest and cover the eye gently. A cold pack held near, not pressed on, a bruised eye can ease swelling.',
          'Do not press on the eyeball.',
          'Get urgent medical help for a cut to the eye, loss of vision, blood in the eye, or a strong blow.',
          'Ask the person to keep both eyes still, since eyes move together.',
        ],
      },
    ],
    related: ['burns', 'head-injury', 'wounds-infection', 'order-of-action'],
  },
];
