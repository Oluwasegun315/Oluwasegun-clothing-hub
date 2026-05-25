import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

const sources = [
  { key: "men", from: path.join(root, "src", "app", "assett", "men cloth"), to: path.join(root, "public", "assett", "men-cloth") },
  { key: "kids", from: path.join(root, "src", "app", "assett", "kids cloth"), to: path.join(root, "public", "assett", "kids-cloth") },
  { key: "streetwear", from: path.join(root, "src", "app", "assett", "Streetwear"), to: path.join(root, "public", "assett", "streetwear") },
];

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  if (!fs.existsSync(from)) {
    console.warn(`Missing: ${from}`);
    return [];
  }
  const files = fs.readdirSync(from).filter((f) => IMAGE_EXT.test(f));
  for (const file of files) {
    fs.copyFileSync(path.join(from, file), path.join(to, file));
  }
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const manifest = {};
for (const { key, from, to } of sources) {
  manifest[key] = copyDir(from, to);
}

const manifestPath = path.join(root, "src", "lib", "data", "store-manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(
  `Synced men=${manifest.men.length}, kids=${manifest.kids.length}, streetwear=${manifest.streetwear.length}`
);
