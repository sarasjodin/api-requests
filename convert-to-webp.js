import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import { mkdir } from "fs/promises";

const inputDir = "src/images/";
const outputDir = "src/images/";

// Se till att output-mappen finns
await mkdir(outputDir, { recursive: true });

// Konvertera alla bilder till WebP
await imagemin([`${inputDir}*.{jpg,png}`], {
  destination: outputDir,
  plugins: [imageminWebp({ quality: 80 })],
});

console.log("✅ Alla bilder har konverterats till WebP!");
