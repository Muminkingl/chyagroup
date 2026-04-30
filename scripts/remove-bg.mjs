import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, resolve } from 'path';

const brandsDir = resolve('./public/brands');
const files = await readdir(brandsDir);
const pngs = files.filter(f => f.toLowerCase().endsWith('.png'));

// Flood-fill BFS from all 4 corners to remove the background color
function floodFillTransparent(pixels, width, height, channels, tolerance = 35) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed from all 4 corners
  const corners = [0, width - 1, (height - 1) * width, (height - 1) * width + width - 1];
  for (const corner of corners) {
    if (!visited[corner]) {
      queue.push(corner);
      visited[corner] = 1;
    }
  }

  // Also seed from all edge pixels for robustness
  for (let x = 0; x < width; x++) {
    [x, (height - 1) * width + x].forEach(idx => {
      if (!visited[idx]) { queue.push(idx); visited[idx] = 1; }
    });
  }
  for (let y = 0; y < height; y++) {
    [y * width, y * width + width - 1].forEach(idx => {
      if (!visited[idx]) { queue.push(idx); visited[idx] = 1; }
    });
  }

  // Get seed color from top-left corner
  const seedR = pixels[0];
  const seedG = pixels[1];
  const seedB = pixels[2];

  let head = 0;
  while (head < queue.length) {
    const pixelIdx = queue[head++];
    const byteIdx = pixelIdx * channels;
    const r = pixels[byteIdx];
    const g = pixels[byteIdx + 1];
    const b = pixels[byteIdx + 2];

    // Check if this pixel is similar to the seed background color
    if (Math.abs(r - seedR) <= tolerance && Math.abs(g - seedG) <= tolerance && Math.abs(b - seedB) <= tolerance) {
      pixels[byteIdx + 3] = 0; // Make transparent

      const x = pixelIdx % width;
      const y = Math.floor(pixelIdx / width);

      // Check 4 neighbors
      if (x > 0 && !visited[pixelIdx - 1]) { visited[pixelIdx - 1] = 1; queue.push(pixelIdx - 1); }
      if (x < width - 1 && !visited[pixelIdx + 1]) { visited[pixelIdx + 1] = 1; queue.push(pixelIdx + 1); }
      if (y > 0 && !visited[pixelIdx - width]) { visited[pixelIdx - width] = 1; queue.push(pixelIdx - width); }
      if (y < height - 1 && !visited[pixelIdx + width]) { visited[pixelIdx + width] = 1; queue.push(pixelIdx + width); }
    }
  }
}

for (const file of pngs) {
  const filePath = join(brandsDir, file);
  try {
    const { data, info } = await sharp(filePath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    const pixels = new Uint8Array(data);

    floodFillTransparent(pixels, width, height, channels, 40);

    await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
      .png()
      .toFile(filePath);

    console.log(`✅ ${file}`);
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
  }
}

console.log('\nDone!');
