// Usage (from your project root):  node apply-themes.mjs src/landing-pages/speakerphone
// - man-*   folders  -> themes/menTheme
// - woman-* folders  -> themes/womenTheme
// It removes the inline `const CSS = ...` block from cleanprob.jsx / cleanbook.jsx
// and imports the shared theme instead. A .bak copy of each file is saved first.
import fs from "fs";
import path from "path";

const root = process.argv[2] || ".";
const dirs = fs.readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^(man|woman)-/.test(d.name));

for (const d of dirs) {
  const theme = d.name.startsWith("woman") ? "womenTheme" : "menTheme";
  for (const f of ["cleanprob.jsx", "cleanbook.jsx"]) {
    const p = path.join(root, d.name, f);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, "utf8");
    if (src.includes("/themes/")) { console.log("skip (already done):", p); continue; }
    const re = /const CSS = `[\s\S]*?`;\n?/;
    if (!re.test(src)) { console.warn("WARN: no `const CSS` block found in", p); continue; }
    fs.writeFileSync(p + ".bak", src);
    const lines = src.replace(re, "").split("\n");
    let last = -1;
    lines.forEach((l, i) => { if (/^import .* from /.test(l)) last = i; });
    lines.splice(last + 1, 0, `import { CSS } from "../themes/${theme}";`);
    fs.writeFileSync(p, lines.join("\n"));
    console.log("updated:", p, "->", theme);
  }
}
