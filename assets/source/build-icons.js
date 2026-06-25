// Rasterizes the RoamKit SVG logo into all the PNG assets Expo needs.
// Run with: node assets/source/build-icons.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = __dirname;
const OUT = path.join(__dirname, '..');

const full = fs.readFileSync(path.join(SRC, 'logo-full.svg'));
const mark = fs.readFileSync(path.join(SRC, 'logo-mark.svg'));

const NAVY = { r: 11, g: 18, b: 32, alpha: 1 }; // #0B1220

async function render(svg, size, file, bg) {
  let img = sharp(svg, { density: 384 }).resize(size, size, {
    fit: 'contain',
    background: bg || { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (bg) img = img.flatten({ background: bg });
  await img.png().toFile(path.join(OUT, file));
  console.log('  ✓', file, `${size}x${size}`);
}

(async () => {
  console.log('Building RoamKit icons…');
  // Main app icon (opaque, OS applies corner mask)
  await render(full, 1024, 'icon.png', NAVY);
  // Android adaptive foreground (transparent, mark only)
  await render(mark, 1024, 'android-icon-foreground.png');
  // Android monochrome (themed icons) — same mark silhouette
  await render(mark, 1024, 'android-icon-monochrome.png');
  // Splash mark (transparent; splash bg color set in app.json)
  await render(mark, 1024, 'splash-icon.png');
  // Web favicon
  await render(full, 196, 'favicon.png', NAVY);
  // A solid navy background tile (kept for completeness)
  await sharp({
    create: { width: 1024, height: 1024, channels: 4, background: NAVY },
  })
    .png()
    .toFile(path.join(OUT, 'android-icon-background.png'));
  console.log('  ✓ android-icon-background.png 1024x1024');
  console.log('Done.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
