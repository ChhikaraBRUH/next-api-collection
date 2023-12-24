import fs from "fs/promises";
import path from "node:path";

export default async function findApiDir(basePath = "./") {
  const files = await fs.readdir(basePath);

  for (const file of files) {
    const fullPath = path.join(basePath, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      if (path.basename(basePath) === "app" && file === "api") {
        return fullPath;
      }

      const found = await findApiDir(fullPath);
      if (found) return found;
    }
  }

  return false;
}
