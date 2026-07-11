export default [
  {
    id: 'rule-of-3s',
    categoryId: 'priorities',
    title: 'The Rule of 3s',
    summary: 'A simple memory aid for what will harm you first, so you fix the biggest danger first.',
    emergency: false,
    severity: 1,
    keywords: ['rule of three', 'rule of threes', 'priorities', 'what first', 'survival order', '333'],
    quickSteps: [
      'Fix breathing and safety first. You have about 3 minutes without air.',
      'Get out of extreme heat, cold, or wet next. You have about 3 hours without shelter.',
      'Find and treat water after that. You have about 3 days without water.',
      'Food comes last. You have about 3 weeks without food.',
      'Work down the list in order. Do not chase food while you are freezing.',
    ],
    sections: [
      {
        heading: 'What the rule means',
        paragraphs: [
          'The Rule of 3s is a rough guide, not an exact clock. It tells you the order to solve problems in.',
          'Roughly: 3 minutes without air, 3 hours without shelter in harsh weather, 3 days without water, 3 weeks without food.',
          'Each step assumes the ones before it are handled. There is no point purifying water if you are about to drown or freeze.',
        ],
      },
      {
        heading: 'How to use it under stress',
        paragraphs: [
          'When you feel panic, run the list from the top.',
          'Ask: Can I breathe and am I safe right now? Am I getting too hot, too cold, or too wet? Do I have water? Do I have food?',
          'Fix the first problem you find before moving on.',
        ],
        steps: [
          'Air and immediate danger (bleeding, drowning, fire, gas).',
          'Body temperature and shelter from weather.',
          'Water.',
          'Food.',
        ],
      },
      {
        heading: 'Important limits',
        paragraphs: [
          'The times are averages. Cold water, injury, illness, or age can make them much shorter.',
          'Do not use the long food window as an excuse to ignore hunger safety. Use the rule only to choose what to do first.',
        ],
        warning: 'In very cold or very hot weather, shelter can become more urgent than water. Treat the biggest threat to your body temperature as the priority.',
      },
    ],
    related: ['order-of-action', 'stay-calm', 'stay-or-go', 'hypothermia', 'heatstroke'],
  },
  {
    id: 'order-of-action',
    categoryId: 'priorities',
    title: 'Order of Action',
    summary: 'A calm, fixed sequence of steps to take in any emergency so you do not freeze up or miss something.',
    emergency: false,
    severity: 1,
    keywords: ['what to do first', 'steps', 'plan', 'emergency order', 'stop', 'assess'],
    quickSteps: [
      'Stop and take one slow breath. Do not rush.',
      'Check for danger to you first. Do not become a second casualty.',
      'Check anyone hurt: are they breathing? Stop serious bleeding.',
      'Protect everyone from the weather.',
      'Call or signal for help if you can.',
      'Sort out water, warmth, and a plan for the night.',
    ],
    sections: [
      {
        heading: 'Stop before you act',
        paragraphs: [
          'The first mistake in an emergency is acting too fast. Stop for a few seconds.',
          'Take one slow breath. Look around. Decide what is actually happening before you move.',
        ],
      },
      {
        heading: 'The order to work in',
        paragraphs: [
          'Follow the same order every time so you do not miss a step.',
        ],
        steps: [
          'Safety: is it safe to stay here? Move only if staying is more dangerous.',
          'Life threats: check breathing, stop heavy bleeding, treat anyone who is not responding.',
          'Shelter and warmth: get out of wind, rain, sun, and cold.',
          'Signal: make yourself easy to find. Call, text, whistle, or lay out a marker.',
          'Water and rest: treat water, save energy, plan for the next hours.',
        ],
      },
      {
        heading: 'Keep checking',
        paragraphs: [
          'Situations change. Weather turns, injuries get worse, help may or may not come.',
          'Every so often, run through the list again. Fix the biggest new problem first.',
        ],
        warning: 'Never put yourself in danger to reach someone. If you are hurt too, no one is left to help.',
      },
    ],
    related: ['rule-of-3s', 'stay-calm', 'stay-or-go', 'severe-bleeding', 'cpr'],
  },
  {
    id: 'stay-calm',
    categoryId: 'priorities',
    title: 'Staying Calm',
    summary: 'Fear is normal, but panic wastes energy and clouds thinking. Simple steps help you settle.',
    emergency: false,
    severity: 2,
    keywords: ['panic', 'fear', 'breathe', 'calm down', 'scared', 'anxiety'],
    quickSteps: [
      'Stop moving. Sit or crouch if you can.',
      'Breathe in slowly for 4 counts, out slowly for 4 counts. Repeat.',
      'Name three things you can see and three you can hear.',
      'Say out loud: I am safe for this moment. I can think.',
      'Pick one small, useful task and do only that.',
    ],
    sections: [
      {
        heading: 'Why calm matters',
        paragraphs: [
          'Panic makes your heart race, your hands shake, and your thinking narrow.',
          'A calm mind spots water, shelter, and dangers that a panicked mind walks past.',
          'Staying calm also saves energy, warmth, and water. Panic burns all three fast.',
        ],
      },
      {
        heading: 'Simple ways to settle down',
        paragraphs: [
          'These work even when you are very frightened. Do them slowly.',
        ],
        steps: [
          'Slow your breathing. Long breath in, long breath out.',
          'Ground yourself: notice what you can see, hear, and feel.',
          'Take a sip of water if you have it.',
          'Break the problem into one small step at a time.',
          'If you are with others, speak in a low, steady voice. Calm is catching.',
        ],
      },
      {
        heading: 'For a frightened child or companion',
        paragraphs: [
          'Get down to their level. Keep your voice soft and slow.',
          'Give them one small job to do. Having a task reduces fear.',
          'Reassure them that you have a plan, even a simple one.',
        ],
      },
    ],
    related: ['rule-of-3s', 'order-of-action', 'stay-or-go', 'phone-battery'],
  },
  {
    id: 'stay-or-go',
    categoryId: 'priorities',
    title: 'Stay or Go',
    summary: 'Deciding whether to wait where you are or move can be the most important choice you make.',
    emergency: false,
    severity: 1,
    keywords: ['stay put', 'walk out', 'move', 'wait for rescue', 'lost', 'self rescue'],
    quickSteps: [
      'If someone knows your route and roughly when to expect you, staying put is usually safer.',
      'Stay if you are hurt, it is dark, the weather is bad, or you do not know the way.',
      'Move only if you know a safe route and staying is more dangerous.',
      'Before moving, mark your direction and leave a note of where you are going.',
      'Never split the group unless there is no other choice.',
    ],
    sections: [
      {
        heading: 'When staying is safer',
        paragraphs: [
          'In most cases, staying put is the safer choice. It is easier for rescuers to find a person who stays still.',
          'Stay if people expect you and will raise the alarm.',
          'Stay if you are injured, exhausted, low on water, or if night or bad weather is coming.',
          'Stay near any shelter, water, or an open area where you can be seen from the air.',
        ],
      },
      {
        heading: 'When moving may be needed',
        paragraphs: [
          'Move only if no one will come looking, or if your current spot is dangerous, for example a flood zone or a place with no shelter at all.',
          'Move only if you know a clear, safe direction to reach help.',
        ],
        steps: [
          'Pick one clear direction and a landmark to aim for.',
          'Leave a marker and a written note saying where and when you left.',
          'Carry your water and warm layers.',
          'Follow a valley or stream downhill where safe, as this often leads to people.',
          'Rest before you are exhausted. Turn back if the route becomes unsafe.',
        ],
        warning: 'Do not walk at night or into bad weather unless staying would kill you sooner. Most people who get lost are found close to where they were last seen.',
      },
      {
        heading: 'Keep the group together',
        paragraphs: [
          'A group is easier to find and can share warmth and tasks.',
          'Splitting up doubles the search and puts the weakest person alone. Avoid it unless there is truly no other way.',
        ],
      },
    ],
    related: ['rule-of-3s', 'order-of-action', 'rule-of-3-signals', 'staying-oriented', 'staying-dry'],
  },
];
