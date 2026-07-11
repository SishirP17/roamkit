export default [
  {
    id: 'lightning',
    categoryId: 'weather',
    title: 'Lightning Safety',
    summary: 'If you can hear thunder, you are close enough to be struck; get inside a building or hard-topped vehicle.',
    emergency: false,
    severity: 2,
    keywords: ['thunder', 'storm', 'struck', 'lightning', 'electric'],
    quickSteps: [
      'When thunder roars, go indoors. There is no safe place outside.',
      'Get into a substantial building or a hard-topped vehicle.',
      'Wait 30 minutes after the last thunder before going back out.',
      'If caught outside, avoid high ground, lone trees, and water.',
      'Do not shelter under an isolated tree.',
      'Spread your group apart so one strike cannot injure everyone.',
    ],
    sections: [
      {
        heading: 'Recognize the danger',
        paragraphs: [
          'Lightning can strike from many miles away, even from a sky that is not yet raining. If you can hear thunder at all, you are within striking distance. This is the meaning of the phrase, when thunder roars, go indoors.',
          'You can also use the 30-30 rule. If you see a flash and hear thunder in 30 seconds or less, the storm is close enough to be dangerous. Wait 30 minutes after the last thunder before returning outside.',
        ],
      },
      {
        heading: 'Get to safe shelter',
        paragraphs: [
          'There is no safe place outdoors in a thunderstorm. Only two places give real protection.',
        ],
        steps: [
          'A large, enclosed building with wiring and plumbing is safest.',
          'A hard-topped, fully enclosed vehicle with the windows up also protects you.',
          'Once inside, stay away from windows, and avoid corded phones, plumbing, and things plugged into outlets.',
          'Small structures like sheds, tents, and picnic shelters do not protect you.',
        ],
      },
      {
        heading: 'If you are caught outside',
        paragraphs: [
          'If no shelter is reachable, you cannot make yourself safe, only slightly less exposed. Act to lower your risk while you keep moving toward shelter.',
        ],
        steps: [
          'Get off high ground and away from ridgelines and open fields.',
          'Get away from and out of water, including lakes, rivers, and puddles.',
          'Stay away from tall lone trees, poles, fences, and metal objects.',
          'If in a group, spread out several body lengths apart.',
          'Do not lie flat. If a strike feels imminent, crouch low on the balls of your feet, but keep moving to shelter if you can.',
        ],
        warning: 'Never shelter under a single tall tree. It is one of the most dangerous places to be in a storm.',
      },
      {
        heading: 'If someone is struck',
        paragraphs: [
          'A person struck by lightning carries no electric charge and is safe to touch. Lightning often stops the heart or breathing, so act at once.',
        ],
        steps: [
          'Call for emergency help immediately.',
          'If they are not breathing and you are trained, start CPR.',
          'Move the group to safer ground, because lightning can strike the same area again.',
        ],
      },
    ],
    related: ['storms', 'flash-floods', 'shelter-site', 'cpr'],
  },
  {
    id: 'flash-floods',
    categoryId: 'weather',
    title: 'Flash Floods',
    summary: 'Fast-rising water can sweep away people and vehicles in seconds; move to high ground and never enter moving water.',
    emergency: true,
    severity: 1,
    keywords: ['flood', 'flash flood', 'water', 'drown', 'rising', 'high ground'],
    quickSteps: [
      'Move to high ground immediately at the first sign of rising water.',
      'Turn around, do not drown. Never walk or drive into flood water.',
      'Six inches of moving water can knock an adult off their feet.',
      'A foot of water can float and sweep away a car.',
      'Leave low areas, canyons, and stream beds fast.',
      'Never let children or pets near moving flood water.',
    ],
    sections: [
      {
        heading: 'Recognize the threat',
        paragraphs: [
          'A flash flood is a sudden, fast rise of water, often from heavy rain miles upstream. It can arrive as a wall of water in a place where it is not even raining. Canyons, dry stream beds, and low road crossings fill in minutes.',
          'Flood water is more powerful than it looks. It is also often muddy, so you cannot see that the road or ground beneath it has washed away.',
        ],
        steps: [
          'Watch for fast-rising or fast-moving water, and a roar of water upstream.',
          'Be alert at night and during heavy rain, when floods are hardest to see.',
          'If a flood warning is issued, act on it right away.',
        ],
      },
      {
        heading: 'Get to high ground',
        paragraphs: [
          'The single best action is to move up and away from the water before it reaches you. Do not wait to see how bad it gets.',
        ],
        steps: [
          'Climb to the highest nearby ground at once.',
          'Get out of canyons, ravines, dry washes, and stream beds immediately.',
          'Do not return for belongings. Water rises faster than you expect.',
        ],
      },
      {
        heading: 'Never enter moving water',
        paragraphs: [
          'Most flood deaths happen when people walk or drive into water. The National Weather Service message is simple: turn around, do not drown.',
        ],
        steps: [
          'Never walk into moving water. Just six inches can sweep you off your feet.',
          'Never drive into a flooded road. A foot of water can float most cars, and two feet can carry away trucks and SUVs.',
          'If you cannot see the ground under the water, treat it as impassable.',
          'If your car stalls in rising water, abandon it and get to high ground if you can do so safely.',
        ],
        warning: 'This is a life-threatening emergency. Turning back from a flooded crossing is always the right choice, even if it costs time.',
      },
      {
        heading: 'If you are caught in the water',
        paragraphs: [
          'If you are already swept in, you must fight to stay at the surface and reach an edge.',
        ],
        steps: [
          'Turn to face downstream and keep your feet up near the surface to fend off obstacles.',
          'Do not try to stand in moving water; your foot can get pinned underwater.',
          'Swim or angle toward the nearest bank or any solid, high object to grab.',
        ],
      },
    ],
    related: ['storms', 'lightning', 'drowning', 'shelter-site'],
  },
  {
    id: 'storms',
    categoryId: 'weather',
    title: 'Severe Storms',
    summary: 'High wind, hail, and tornadoes can arrive fast; get inside, get low, and put walls between you and the storm.',
    emergency: false,
    severity: 2,
    keywords: ['storm', 'tornado', 'wind', 'hail', 'shelter', 'severe weather'],
    quickSteps: [
      'Get inside a sturdy building before the storm hits.',
      'For a tornado, go to a basement or a small inner room on the lowest floor.',
      'Put as many walls as possible between you and the outside.',
      'Stay away from windows and cover your head and neck.',
      'Outdoors with no shelter, lie low in a ditch away from trees.',
      'Do not shelter in a vehicle or mobile home during a tornado.',
    ],
    sections: [
      {
        heading: 'Read the warning signs',
        paragraphs: [
          'Severe storms can bring damaging wind, large hail, lightning, flooding, and tornadoes. Watch the sky and any alerts you can receive. A watch means conditions are possible; a warning means it is happening and you must act.',
          'Warning signs of a tornado include a dark or greenish sky, a wall of clouds, large hail, a loud roar like a freight train, and a visible funnel.',
        ],
      },
      {
        heading: 'Shelter from wind and tornadoes',
        paragraphs: [
          'The safest place is inside a strong building, as low and as central as possible. The goal is to put distance and walls between you and flying debris, which causes most injuries.',
        ],
        steps: [
          'Go to a basement or storm cellar if you have one.',
          'If not, choose a small windowless inner room on the lowest floor, such as a bathroom or closet.',
          'Crouch low, face down, and cover your head and neck with your arms and any padding.',
          'Stay away from windows, outside walls, and doors.',
        ],
        warning: 'Do not stay in a mobile home, tent, or vehicle during a tornado. They offer almost no protection. Leave for a sturdy building.',
      },
      {
        heading: 'If you are caught outside',
        paragraphs: [
          'With no building nearby, you must minimize your exposure to wind and flying debris.',
        ],
        steps: [
          'Get to the lowest ground you can find, such as a ditch or depression.',
          'Lie face down, cover your head and neck, and stay away from trees and vehicles.',
          'Watch for flooding, since low ground can fill with water.',
        ],
      },
      {
        heading: 'After the storm',
        paragraphs: [
          'Danger does not end when the wind stops. Downed power lines, broken glass, gas leaks, and unstable debris remain.',
        ],
        steps: [
          'Stay clear of downed power lines and assume they are live.',
          'Watch your footing around debris and broken structures.',
          'Do not return to a damaged building until it is confirmed safe.',
        ],
      },
    ],
    related: ['lightning', 'flash-floods', 'shelter-site', 'staying-dry'],
  },
  {
    id: 'avalanche',
    categoryId: 'weather',
    title: 'Avalanche',
    summary: 'A moving slab of snow can bury a person in seconds; avoid dangerous slopes, and if caught, fight to stay on top and make an air pocket.',
    emergency: true,
    severity: 1,
    keywords: ['avalanche', 'snow', 'slide', 'buried', 'slope', 'mountain'],
    quickSteps: [
      'Avoid steep open snow slopes, especially after fresh snow or warming.',
      'Cross risky slopes one person at a time.',
      'If caught, try to move off the moving slab to the side.',
      'Grab a tree or rock as an anchor if one is close.',
      'Swim hard to stay near the surface as the snow slows.',
      'As it stops, clear an air space in front of your mouth and push a hand up.',
    ],
    sections: [
      {
        heading: 'Understand and avoid the danger',
        paragraphs: [
          'Most avalanches that catch people are triggered by the people themselves on steep snow slopes. Avoiding dangerous terrain is far more reliable than surviving a burial. The chance of survival drops sharply the longer someone is buried.',
          'Danger is highest on slopes around 30 to 45 degrees, during and just after heavy snowfall, in strong wind, and during rapid warming. Slab avalanches often release as a large block that breaks above you.',
        ],
        steps: [
          'Check local avalanche forecasts before traveling in snowy mountains.',
          'Avoid steep, open, snow-loaded slopes and the runout zones below them.',
          'Cross suspect slopes one at a time so others can watch and dig.',
          'Carry a transceiver, probe, and shovel, and know how to use them, in avalanche country.',
        ],
      },
      {
        heading: 'If you are caught',
        paragraphs: [
          'Everything you do must happen while the snow is still moving. Once an avalanche stops, the debris sets like concrete and you cannot move. Act instantly.',
        ],
        steps: [
          'Try to move to the side, off the moving slab, toward its edge.',
          'If a tree or rock is right there, grab and hold it.',
          'If swept away, fight hard. Swim and kick to stay near the surface.',
          'As the flow slows, thrust one arm toward the surface so rescuers can see it.',
          'With the other hand, clear a pocket of space in front of your mouth and nose before the snow sets.',
        ],
        warning: 'This is a life-threatening emergency. Buried victims run out of air quickly. Any survivors must search and dig at once; do not leave to get help first.',
      },
      {
        heading: 'If your partner is buried',
        paragraphs: [
          'The buried person depends on you, not on distant rescuers who cannot arrive in time. Speed is everything.',
        ],
        steps: [
          'Watch the person as they are swept, and mark the last place you saw them.',
          'Search downhill from that point with a transceiver, then probe and dig fast.',
          'Once you reach them, clear the airway first and treat for cold and injury.',
        ],
      },
    ],
    related: ['hypothermia', 'shelter-site', 'cpr', 'storms'],
  },
  {
    id: 'altitude-sickness',
    categoryId: 'weather',
    title: 'Altitude Sickness',
    summary: 'At high elevation the thin air can make you ill; the only reliable cure is to go down, and you must never climb higher with symptoms.',
    emergency: false,
    severity: 2,
    keywords: ['altitude', 'mountain sickness', 'AMS', 'oxygen', 'headache', 'descend'],
    quickSteps: [
      'Recognize early signs: headache, nausea, tiredness, dizziness.',
      'Stop climbing the moment symptoms appear.',
      'Never ascend to sleep higher while you have symptoms.',
      'Rest and drink water; wait for symptoms to fully clear.',
      'If symptoms worsen, go down without delay.',
      'Descending is the only reliable cure. Do not wait.',
    ],
    sections: [
      {
        heading: 'Recognize the symptoms',
        paragraphs: [
          'Acute mountain sickness (AMS) comes from the thin, low-oxygen air at high elevation. It can affect anyone, regardless of fitness, and often starts within hours of going up too fast.',
          'The main sign is a headache, usually with one or more of the following.',
        ],
        steps: [
          'Headache, often the first and main symptom.',
          'Nausea or loss of appetite.',
          'Fatigue and weakness.',
          'Dizziness or lightheadedness.',
          'Trouble sleeping.',
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Mild AMS is a warning. Treat it seriously so it does not become severe. The most important rule is to stop going up.',
        ],
        steps: [
          'Stop ascending as soon as symptoms appear.',
          'Rest at your current elevation and drink plenty of water.',
          'Do not go higher to sleep until you feel completely normal again.',
          'Simple pain relief and rest may ease a mild headache.',
          'If symptoms do not improve, or get worse, go down to a lower elevation.',
        ],
        warning: 'Never continue climbing or sleep at a higher altitude while you have any symptoms of altitude illness, no matter how minor they seem.',
      },
      {
        heading: 'When it is an emergency',
        paragraphs: [
          'AMS can progress to life-threatening swelling of the brain or lungs. These are medical emergencies that require immediate descent and help.',
        ],
        steps: [
          'Brain (HACE): confusion, unsteady walking, drowsiness, or clumsiness like being drunk.',
          'Lungs (HAPE): breathlessness at rest, a wet cough, chest tightness, and blue lips or nails.',
          'For either, descend immediately, as far down as possible, and seek medical help.',
        ],
        warning: 'Descent is the only reliable cure. Do not wait for morning or for the group. Go down now. This guidance does not replace professional medical care.',
      },
      {
        heading: 'Prevention',
        paragraphs: [
          'The best defense is to give your body time to adjust as you climb. This is called acclimatization.',
        ],
        steps: [
          'Ascend slowly. Above about 3000 meters, raise your sleeping elevation only a modest amount each day.',
          'Take a rest day every few thousand feet of gain.',
          'Climb high during the day but sleep lower.',
          'Stay hydrated and avoid alcohol while adjusting.',
        ],
      },
    ],
    related: ['hypothermia', 'dehydration', 'shelter-site', 'storms'],
  },
];
