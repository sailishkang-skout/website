const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildFavicons() {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const publicDir = path.join(process.cwd(), 'public');
  const appDir = path.join(process.cwd(), 'src', 'app');

  // 1. Crop left symbol from logo (237x237 square)
  const symbolBuffer = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: 237, height: 237 })
    .trim()
    .toBuffer();

  const metadata = await sharp(symbolBuffer).metadata();
  console.log('Cropped symbol mark dimensions:', metadata.width, 'x', metadata.height);

  // 2. Composite cropped symbol centered on high-res dark rounded square canvas (512x512)
  const canvasSize = 512;
  const padding = 64; // Gives breathing space so icon doesn't touch edges
  const maxIconSize = canvasSize - padding * 2;

  const resizedSymbol = await sharp(symbolBuffer)
    .resize(maxIconSize, maxIconSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3'
    })
    .toBuffer();

  const backgroundSvg = Buffer.from(`
    <svg width="${canvasSize}" height="${canvasSize}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${canvasSize}" height="${canvasSize}" rx="128" fill="#090d16" />
      <rect width="${canvasSize - 8}" height="${canvasSize - 8}" x="4" y="4" rx="124" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-width="8" />
    </svg>
  `);

  const masterFaviconBuffer = await sharp(backgroundSvg)
    .composite([{ input: resizedSymbol, gravity: 'center' }])
    .png()
    .toBuffer();

  // Save master 512x512
  await sharp(masterFaviconBuffer).toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('Generated 512x512 favicon');

  // Save Apple Touch Icon (180x180)
  await sharp(masterFaviconBuffer)
    .resize(180, 180, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated 180x180 Apple touch icon');

  // Save 32x32 PNG favicon
  const favicon32 = await sharp(masterFaviconBuffer)
    .resize(32, 32, { kernel: 'lanczos3' })
    .sharpen()
    .toBuffer();

  await fs.promises.writeFile(path.join(publicDir, 'favicon-32x32.png'), favicon32);
  await fs.promises.writeFile(path.join(publicDir, 'favicon.ico'), favicon32);
  await fs.promises.writeFile(path.join(appDir, 'favicon.ico'), favicon32);
  await fs.promises.writeFile(path.join(appDir, 'icon.png'), favicon32);
  console.log('Generated ultra-sharp 32x32 favicons');

  // Save 16x16 PNG favicon
  const favicon16 = await sharp(masterFaviconBuffer)
    .resize(16, 16, { kernel: 'lanczos3' })
    .sharpen()
    .toBuffer();

  await fs.promises.writeFile(path.join(publicDir, 'favicon-16x16.png'), favicon16);
  console.log('Generated 16x16 favicon');

  // Generate crisp vector SVG favicon as well
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#090d16"/>
  <rect width="504" height="504" x="4" y="4" rx="124" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-width="8"/>
  <image href="data:image/png;base64,${masterFaviconBuffer.toString('base64')}" width="512" height="512" />
</svg>`;

  await fs.promises.writeFile(path.join(publicDir, 'favicon.svg'), svgContent);
  await fs.promises.writeFile(path.join(appDir, 'icon.svg'), svgContent);
  console.log('Generated vector SVG favicons');
}

buildFavicons().catch(err => {
  console.error('Favicon generation error:', err);
  process.exit(1);
});
