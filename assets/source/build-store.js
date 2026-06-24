// Builds the Google Play store graphics into ../../store/.
// Run with: node assets/source/build-store.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = __dirname;
const STORE = path.join(__dirname, '..', '..', 'store');
const NAVY = { r: 11, g: 18, b: 32, alpha: 1 };

(async () => {
  console.log('Building store graphics…');
  // 512x512 high-res icon for the Play listing
  await sharp(fs.readFileSync(path.join(SRC, 'logo-full.svg')), { density: 384 })
    .resize(512, 512, { fit: 'contain', background: NAVY })
    .flatten({ background: NAVY })
    .png()
    .toFile(path.join(STORE, 'play-icon-512.png'));
  console.log('  ✓ play-icon-512.png');

  // 1024x500 feature graphic
  await sharp(fs.readFileSync(path.join(SRC, 'feature-graphic.svg')), { density: 200 })
    .resize(1024, 500, { fit: 'cover', background: NAVY })
    .flatten({ background: NAVY })
    .png()
    .toFile(path.join(STORE, 'feature-graphic.png'));
  console.log('  ✓ feature-graphic.png');
  console.log('Done.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
