export default [
  {
    id: 'rule-of-3-signals',
    categoryId: 'signalling',
    title: 'The Rule of Three',
    summary: 'Three of anything, whistles, fires, or flashes, is the worldwide signal that you need help.',
    emergency: false,
    severity: 2,
    keywords: ['signal', 'three', 'sos', 'distress', 'rescue', 'whistle', 'fire'],
    quickSteps: [
      'Make any signal in groups of three: three whistle blasts, three fires, three flashes.',
      'Pause, then repeat the group of three every minute or two.',
      'Space three signal fires or three ground markers in a straight line or triangle.',
      'For Morse SOS, send three short, three long, three short signals.',
      'Keep signalling at set times even if no one seems near.',
    ],
    sections: [
      {
        heading: 'Why three',
        paragraphs: [
          'Three of anything is recognised almost everywhere as a call for help. One sound could be natural. Three in a row is clearly made by a person in trouble.',
          'It works with whatever you have: three whistle blasts, three shouts, three fires, three flashes of a mirror or light, or three piles of rocks.',
        ],
      },
      {
        heading: 'How to send it',
        steps: [
          'Give the signal three times with short, even gaps between them.',
          'Stop and listen or watch for a reply.',
          'Wait about one to two minutes, then send the group of three again.',
          'Keep a steady rhythm so a distant rescuer can tell it is deliberate.',
        ],
      },
      {
        heading: 'SOS in Morse',
        paragraphs: [
          'SOS is the standard distress call. It is three short signals, then three long signals, then three short signals, sent as one group with no gaps inside it.',
          'You can send SOS with a flashlight, a mirror flash, a whistle, or by tapping. Short means a quick flash or beep. Long means a slower one, about three times as long.',
        ],
      },
      {
        heading: 'Make it easy to answer',
        paragraphs: [
          'Signal at times when you are most likely to be seen or heard: dawn, dusk, and when you hear aircraft, engines, or voices.',
          'Conserve your energy and your battery between signals. Rescue can take time, so pace yourself and keep signalling in bursts.',
        ],
        warning: 'Do not signal non-stop until you are exhausted. Steady, repeated groups of three over hours work better than one long burst.',
      },
    ],
    related: ['whistle-mirror', 'ground-to-air', 'phone-battery', 'rule-of-3s'],
  },
  {
    id: 'whistle-mirror',
    categoryId: 'signalling',
    title: 'Whistle and Mirror Signals',
    summary: 'A whistle carries far further than your voice, and a mirror flash can be seen for miles.',
    emergency: false,
    severity: 2,
    keywords: ['whistle', 'mirror', 'signal', 'flash', 'sound', 'rescue', 'reflect'],
    quickSteps: [
      'Blow three sharp whistle blasts, pause, and repeat.',
      'A whistle saves your voice and carries much further than shouting.',
      'Angle a mirror or shiny surface to catch the sun and flash it toward rescuers.',
      'Aim the flash by holding two fingers up and sweeping the bright spot across your target.',
      'Flash in groups of three and sweep the whole horizon and any aircraft.',
    ],
    sections: [
      {
        heading: 'Using a whistle',
        paragraphs: [
          'A whistle is louder than a shout, needs far less energy, and does not wear out your voice. Sound also carries when you are hidden by trees or terrain.',
          'Blow three loud, sharp blasts, pause, then repeat every minute or two. Keep the whistle on a cord around your neck so you never lose it.',
        ],
      },
      {
        heading: 'Using a mirror or shiny object',
        paragraphs: [
          'A mirror flash reflects sunlight and can be seen many miles away, further than almost any other signal. Use a real signal mirror, a phone screen, glasses, foil, a tin lid, or any shiny surface.',
          'Aim by holding the mirror near your eye and stretching your other hand toward the target. Make a V with two fingers, put the target in the V, and tilt the mirror until the bright spot flashes across your fingers and onto the target.',
        ],
        steps: [
          'Catch the sunlight on the mirror so a bright spot appears on your outstretched hand.',
          'Line up the target, an aircraft, boat, or distant person, in the V of your fingers.',
          'Tilt the mirror slowly until the bright spot passes across the target.',
          'Flash in groups of three, then sweep slowly along the whole horizon.',
        ],
      },
      {
        heading: 'When to use each',
        paragraphs: [
          'Use the whistle when rescuers may be close but out of sight, in fog, forest, or darkness. Sound reaches where light cannot.',
          'Use the mirror on bright days for distant or airborne rescuers. Even a brief flash can catch a pilot or a searcher far away.',
        ],
        warning: 'A mirror needs sunshine. Keep a whistle as your backup for cloudy days, night, and dense cover.',
      },
    ],
    related: ['rule-of-3-signals', 'ground-to-air', 'phone-battery'],
  },
  {
    id: 'ground-to-air',
    categoryId: 'signalling',
    title: 'Ground to Air Signals',
    summary: 'Large ground symbols tell aircraft what you need: V for assistance and X for medical help.',
    emergency: false,
    severity: 2,
    keywords: ['ground', 'air', 'aircraft', 'signal', 'V', 'X', 'rescue', 'symbol'],
    quickSteps: [
      'Make one big symbol on open ground: V means you need assistance.',
      'Make an X to mean you need urgent medical help.',
      'Build each symbol at least 3 metres (10 feet) across, larger if you can.',
      'Use anything that contrasts with the ground: rocks, logs, gear, trampled snow.',
      'When a plane is close, stand by your symbol and wave both arms overhead.',
    ],
    sections: [
      {
        heading: 'The main symbols',
        paragraphs: [
          'A single letter laid on the ground tells a pilot your situation at a glance. The two most important are simple to remember.',
          'V means you require assistance. X means you require urgent medical help. An arrow shows the direction you are travelling. These are recognised internationally.',
        ],
      },
      {
        heading: 'Make it big and clear',
        steps: [
          'Choose flat, open ground that a pilot can see from above: a clearing, beach, or field.',
          'Make each symbol at least 3 metres (10 feet) long, and much bigger if you can.',
          'Use material that stands out from the ground. On grass use rocks or logs. On snow, stamp deep lines or lay dark branches.',
          'Make the lines thick and solid so the shape reads clearly from high up.',
        ],
      },
      {
        heading: 'Body signals when a plane is near',
        paragraphs: [
          'When an aircraft is close enough to see you, stand in the open and raise both arms straight up in a Y shape to signal yes, I need to be picked up.',
          'Waving both arms over your head is the standard call for attention and help. One arm raised and one down can be used to signal no.',
          'If a pilot has seen you, they often rock the wings side to side, or flash the landing lights, to say your signal is received.',
        ],
        warning: 'Do not stand under trees or in shadow when signalling to aircraft. Get into the open where you can be seen against a clear background.',
      },
    ],
    related: ['rule-of-3-signals', 'whistle-mirror', 'staying-oriented'],
  },
  {
    id: 'phone-battery',
    categoryId: 'signalling',
    title: 'Making Your Phone Last',
    summary: 'A phone is your best rescue tool, so protect the battery and use it in short bursts.',
    emergency: false,
    severity: 2,
    keywords: ['phone', 'battery', 'signal', 'emergency', 'sos', 'power', 'call'],
    quickSteps: [
      'Try one emergency call or text first, even with no bars. Emergency calls can use any network.',
      'Turn on airplane mode or low power mode between attempts to save battery.',
      'Send a text with your location. Texts get through on weak signal when calls fail.',
      'Turn the screen brightness right down and close all other apps.',
      'Keep the phone warm against your body. Cold drains batteries fast.',
    ],
    sections: [
      {
        heading: 'Call or text for help first',
        paragraphs: [
          'Your phone can dial emergency services even with no signal bars and even on another carrier network, so try an emergency call first.',
          'If a call will not connect, send a text message to emergency services or to someone who can relay it. Texts need far less signal and keep trying to send in the background.',
          'Include your best guess of location: landmarks, distance walked, direction, and time. Many phones can share GPS coordinates even when offline.',
        ],
      },
      {
        heading: 'Stretch the battery',
        steps: [
          'Switch on low power or battery saver mode straight away.',
          'Use airplane mode between attempts. Searching for signal is what drains the battery fastest.',
          'Turn screen brightness to the lowest usable level and turn off vibration.',
          'Close background apps and turn off Bluetooth and Wi-Fi if you are not using them.',
          'Only power up to signal or check at set times, then switch back to saving mode.',
        ],
      },
      {
        heading: 'Protect the phone',
        paragraphs: [
          'Cold weakens batteries quickly. Keep the phone in an inside pocket close to your body heat, not in an outer bag.',
          'Keep it dry. A sealed plastic bag protects it from rain and sweat. A working phone is worth more than any other signal you can make.',
        ],
        warning: 'Do not waste your battery on photos, games, or repeated signal checks. Save it for calls, texts, the flashlight, and its screen as a night signal.',
      },
    ],
    related: ['rule-of-3-signals', 'whistle-mirror', 'staying-oriented'],
  },
];
