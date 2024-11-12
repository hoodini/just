const sharp = require('sharp');
const fs = require('fs');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="#8B5CF6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="11 12 17 2 13 12 19 22 11 12"/>
  <polygon points="10 12 4 2 8 12 2 22 10 12"/>
</svg>`;

const sizes = [16, 48, 128];

async function createIcons() {
    for (const size of sizes) {
        await sharp(Buffer.from(svgContent))
            .resize(size, size)
            .toFile(`icon${size}.png`);
    }
}

createIcons().catch(console.error); 