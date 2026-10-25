import fs from "node:fs";
import path from "node:path";

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (file.endsWith(".html")) {
      const html = fs.readFileSync(file, "utf8");
      fs.writeFileSync(file, html.replace(/<html lang="ru"/, '<html lang="en"'));
    }
  }
}
if (fs.existsSync("out/en")) visit("out/en");
