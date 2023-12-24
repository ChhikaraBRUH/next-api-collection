import fs from "fs/promises";
import path from "node:path";

const files = [];

export default async function findRouteFiles(apiDirPath) {
  try {
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

    if (files?.length === 0) {
      throw new Error(
        "Could not find any route files. Route files must be named 'route.js' or 'route.ts' and be located in the 'api' directory of the Next.js 13+ application. Are you sure you have any API route files defined?"
      );
    }

    return files;
  } catch (error) {
    throw error;
  }
}
