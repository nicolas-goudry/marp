import fs from 'fs';
import path from 'path';
import * as sass from 'sass';

const outDir = path.join(process.cwd(), 'themes');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const flavors = ['latte', 'frappe', 'macchiato', 'mocha'];

for (const flavor of flavors) {
  const scssData = `
    $flavor: "${flavor}";
    @import "src/catppuccin.scss";
  `;

  try {
    const result = sass.compileString(scssData, {
      loadPaths: [process.cwd(), path.join(process.cwd(), 'node_modules')],
      style: 'expanded',
    });

    const outFile = path.join(outDir, `catppuccin-${flavor}.css`);

    fs.writeFileSync(outFile, result.css);
    console.log(`✅ Successfully built: ${outFile}`);
  } catch (error) {
    console.error(`❌ Error compiling ${flavor}:`, error.message);
  }
}
