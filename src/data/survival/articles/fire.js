export default [
  {
    id: 'building-fire',
    categoryId: 'fire',
    title: 'Building a Fire',
    summary: 'Build a fire in stages, from tiny tinder up to solid fuel, so it lights fast and keeps burning.',
    emergency: false,
    severity: 2,
    keywords: ['fire', 'campfire', 'tinder', 'kindling', 'warmth', 'build'],
    quickSteps: [
      'Gather three sizes: fine tinder, thin kindling, and thick fuel wood.',
      'Clear a bare-earth ring away from brush and low branches.',
      'Start small. Build a teepee or lean-to over a loose tinder bundle.',
      'Light the tinder low and on the upwind side.',
      'Feed thin kindling first, then thicker wood as flames grow.',
      'Keep water or dirt within reach before you light it.',
    ],
    sections: [
      {
        heading: 'Gather the three fuel sizes first',
        paragraphs: [
          'A fire needs three things fed to it in order: tinder, kindling, then fuel. Collect all three before you strike a spark. If you run out mid-light, the fire dies.',
          'Gather more than you think you need. Dry material is best. If everything is damp, look under logs, inside standing dead wood, and in the center of split branches.',
        ],
        steps: [
          'Tinder: fluffy, dry, catches a spark. Dry grass, bark shavings, birch bark, cattail fluff, pine needles, lint, or paper.',
          'Kindling: dry twigs from matchstick to pencil thickness.',
          'Fuel: dry wood from finger to wrist thickness, added slowly.',
        ],
      },
      {
        heading: 'Prepare the site',
        paragraphs: [
          'Pick a spot sheltered from wind but not enclosed. Clear a circle of bare soil about one arm span wide. Scrape away leaves, grass, and roots so the fire cannot spread underground or sideways.',
        ],
        steps: [
          'Keep the fire well clear of tents, dry brush, and overhanging branches.',
          'On snow or wet ground, build a dry platform of green logs or flat stones first.',
          'Do not use river stones from water; trapped moisture can make them crack or burst.',
        ],
      },
      {
        heading: 'Lay and light the fire',
        paragraphs: [
          'Make a loose bundle of tinder in the center. Build kindling around it in a teepee (cone) or lean-to shape, leaving gaps for air. Fire needs oxygen as much as fuel.',
          'Light the tinder from below, on the side the wind is coming from, so flames blow into the fuel.',
        ],
        steps: [
          'Light the tinder low and let it catch the kindling above it.',
          'Blow gently at the base of the flames to feed them air.',
          'Add kindling one piece at a time as the flames climb.',
          'Only add thick fuel once you have a steady bed of flame.',
        ],
        warning: 'Never leave a fire burning unattended, even briefly. Never use gasoline or fuel to start or boost a fire; the vapor can flash back and burn you.',
      },
    ],
    related: ['keeping-fire', 'fire-without-matches', 'fire-safety', 'hypothermia'],
  },
  {
    id: 'keeping-fire',
    categoryId: 'fire',
    title: 'Keeping a Fire Going',
    summary: 'Once lit, a fire must be fed, banked, and protected so you do not have to start over.',
    emergency: false,
    severity: 3,
    keywords: ['fire', 'ember', 'coals', 'maintain', 'bank', 'firewood'],
    quickSteps: [
      'Add wood steadily before the flames die down, not after.',
      'Build up a bed of hot coals; coals hold heat, not flames.',
      'Keep a dry wood pile close and shielded from rain.',
      'Bank the coals with ash at night to save an ember.',
      'Shield the fire from wind and rain with a rock or log wall.',
    ],
    sections: [
      {
        heading: 'Feed it before it fades',
        paragraphs: [
          'A fire is easiest to keep alive when it is already strong. Add fuel while flames are still healthy. Waiting until it is nearly out forces you to rebuild from kindling.',
          'A deep bed of glowing coals is the heart of a lasting fire. Coals radiate steady heat, reignite new wood quickly, and survive longer than open flames.',
        ],
        steps: [
          'Add a few pieces at a time so you never smother the flame.',
          'Keep the fire small. A small, fed fire lasts longer and wastes less wood.',
          'Stack a drying pile of damp wood near (not on) the fire to ready it.',
        ],
      },
      {
        heading: 'Banking a fire overnight',
        paragraphs: [
          'Banking means covering hot coals so they smolder slowly through the night. In the morning you can uncover a live ember and rebuild without starting fresh.',
        ],
        steps: [
          'Rake the coals into a compact pile.',
          'Cover them with a layer of ash and a little dry soil.',
          'In the morning, uncover the coals, add tinder, and blow gently.',
        ],
      },
      {
        heading: 'Protect it from weather',
        paragraphs: [
          'Wind scatters heat and can blow embers into dry brush. Rain drowns a fire fast. A simple barrier makes a fire far easier to keep.',
        ],
        steps: [
          'Build a low wall of rocks or green logs on the windward side.',
          'This wall also reflects heat back toward you.',
          'Keep a reserve of dry tinder and kindling under cover in case it rains.',
        ],
        warning: 'Do not fully enclose a fire or bring it into a tent or closed shelter. A smoldering fire in an enclosed space can build up deadly carbon monoxide.',
      },
    ],
    related: ['building-fire', 'fire-without-matches', 'fire-safety', 'staying-dry'],
  },
  {
    id: 'fire-without-matches',
    categoryId: 'fire',
    title: 'Fire Without Matches',
    summary: 'Ways to make a spark or flame when you have no matches or lighter, from a ferro rod to friction.',
    emergency: false,
    severity: 2,
    keywords: ['fire', 'ferro rod', 'friction', 'flint', 'spark', 'lens'],
    quickSteps: [
      'Prepare a dry tinder bundle before you try any method.',
      'If you have a ferro rod, scrape sparks straight into the tinder.',
      'In bright sun, focus light through a lens onto the tinder.',
      'Friction methods are hard and slow; expect many attempts.',
      'The moment tinder catches, cup it and blow gently into flame.',
    ],
    sections: [
      {
        heading: 'Have your tinder ready first',
        paragraphs: [
          'Every fire-starting method makes a spark or ember. That spark is useless without fine, bone-dry tinder waiting to catch it. Prepare the tinder bundle before you begin.',
          'Good tinder is fluffy and completely dry: fine grass, shredded bark, char cloth, cotton, dry moss, or a smashed dead plant fluff. Fray it so air moves through it.',
        ],
      },
      {
        heading: 'Spark and lens methods',
        paragraphs: [
          'A ferrocerium rod (ferro rod) is the most reliable no-match tool and works when wet. A flint striking steel also throws sparks. A clear lens can focus sunlight to a burning point.',
        ],
        steps: [
          'Ferro rod: hold the tip near the tinder and scrape hard with a blade or sharp edge to shower sparks into it.',
          'Flint and steel: strike the steel down against the flint edge so sparks land on char cloth or fine tinder.',
          'Lens: use a magnifying glass, eyeglasses, or a clear water-filled bag to focus a bright dot of sun onto dark tinder. Needs strong direct sunlight.',
          'A battery across fine steel wool will heat the wool red and ignite tinder.',
        ],
      },
      {
        heading: 'Friction methods',
        paragraphs: [
          'Friction fire, such as a bow drill or hand drill, makes heat by spinning a wooden spindle against a wooden board until dust forms and glows into an ember. It is effective but takes skill, dry wood, and strong effort. Do not rely on it as your only plan.',
        ],
        steps: [
          'Use dry, dead, soft wood for both spindle and board.',
          'Spin fast and press down until a small pile of dark dust builds and smokes.',
          'Gently tip the glowing ember into your tinder bundle.',
        ],
        warning: 'Do not exhaust yourself. In cold or wet conditions, burning too much energy on a failing method can be dangerous. Conserve strength and protect the tinder you have.',
      },
      {
        heading: 'Turn the ember into flame',
        paragraphs: [
          'Whether you have a spark-lit tinder or a friction ember, the last step is the same. Fold the tinder loosely around the ember, lift it up, and blow steady, gentle breaths through it until it bursts into flame. Then place it under your prepared kindling.',
        ],
      },
    ],
    related: ['building-fire', 'keeping-fire', 'fire-safety', 'hypothermia'],
  },
  {
    id: 'fire-safety',
    categoryId: 'fire',
    title: 'Fire Safety',
    summary: 'Keep a fire under control, put it out fully, and know what to do if fire reaches clothing or a building.',
    emergency: false,
    severity: 2,
    keywords: ['fire', 'safety', 'wildfire', 'grease', 'stop drop roll', 'extinguish'],
    quickSteps: [
      'Keep fires small and ringed with bare soil or stone.',
      'Keep water or dirt beside every fire.',
      'If clothing catches fire: stop, drop, and roll.',
      'Never pour water on a cooking grease or oil fire.',
      'In a building fire, get out, stay out, and call for help.',
      'Drown a campfire, stir it, and drown it again until cold.',
    ],
    sections: [
      {
        heading: 'Keeping an outdoor fire under control',
        paragraphs: [
          'Most wildfires from campfires start because the fire was too big, too close to fuel, or left alone. Control the fire before it controls the land.',
        ],
        steps: [
          'Build on bare soil, well clear of dry grass, brush, and low branches.',
          'Keep the fire small and never build it in high wind.',
          'Keep water and a shovel or dirt within arm reach at all times.',
          'Never leave a fire burning or smoldering unattended.',
        ],
        warning: 'A single wind gust can carry an ember far into dry brush. In dry seasons or fire-restriction areas, do not light open fires at all.',
      },
      {
        heading: 'Put a fire out completely',
        paragraphs: [
          'A fire that looks out can still hold buried heat that reignites hours later. Make it cold to the touch before you leave or sleep.',
        ],
        steps: [
          'Pour water over all the coals, not just the red ones.',
          'Stir the ashes and embers with a stick, then pour more water.',
          'Repeat until there is no hiss, no steam, and no heat.',
          'If you have no water, mix dirt or sand into the coals and stir until cold.',
        ],
      },
      {
        heading: 'If clothing or a person catches fire',
        paragraphs: [
          'Running feeds flames with air and makes them worse. The proven response is stop, drop, and roll.',
        ],
        steps: [
          'Stop moving at once.',
          'Drop to the ground and cover your face with your hands.',
          'Roll over and over until the flames are smothered.',
          'Cool the burn with cool running water and treat it as a burn injury.',
        ],
      },
      {
        heading: 'Cooking fires and building fires',
        paragraphs: [
          'Cooking oil and grease fires and structure fires need different responses. Water makes a grease fire explode outward.',
        ],
        steps: [
          'Grease or oil fire: turn off the heat and smother it with a lid, or use baking soda or salt. Never use water.',
          'Building fire: get everyone out, stay out, and call emergency services. Never go back inside for belongings.',
          'Crawl low under smoke, where the air is clearer, and feel doors for heat before opening.',
        ],
        warning: 'Never burn a fire, stove, or charcoal inside a tent, vehicle, or closed shelter for heat. It produces carbon monoxide, an invisible gas with no smell that can kill you while you sleep.',
      },
    ],
    related: ['building-fire', 'keeping-fire', 'burns', 'storms'],
  },
];
