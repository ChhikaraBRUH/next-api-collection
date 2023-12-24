import fs from "fs/promises";
import path from "node:path";

const files = [];

export default async function findRouteFiles(apiDirPath) {
  const dir = await fs.readdir(apiDirPath);

  for (const file of dir) {
    const fullPath = path.join(apiDirPath, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await findRouteFiles(fullPath);
    } else if (
      file.startsWith("route") &&
      (file.endsWith(".js") || file.endsWith(".ts"))
    ) {
      files.push(fullPath);
    }
  }

  return files;
}
