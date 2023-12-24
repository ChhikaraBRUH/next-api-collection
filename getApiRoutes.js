import path from "node:path";
import fs from "fs/promises";

export default async function getRequests(routeFiles) {
  const requests = [];
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const nameElementsToRemove = [
    "app",
    "api",
    "pages",
    "route.js",
    "route.ts",
    "index.js",
    "index.ts",
  ];

  for (const routeFile of routeFiles) {
    const filePath = path.join(process.cwd(), routeFile);
    const fileContents = await fs.readFile(filePath, "utf8");
    const lines = fileContents.split("\n");

    const url = routeFile
      .replace("app", "http://localhost:3000")
      .replace(/\/route\.(ts|js)$/, "");

    const name = routeFile
      .split("/")
      .filter((element) => !nameElementsToRemove.includes(element))
      .join(" ");

    for (const line of lines) {
      const method = methods.find((method) => line.includes(method));
      if (method) {
        requests.push({
          name,
          request: {
            method,
            url: {
              raw: url,
              protocol: new URL(url)?.protocol.replace(":", ""),
              host: [new URL(url)?.host.split(":")[0]],
              port: new URL(url)?.port,
              path: new URL(url)?.pathname.split("/"),
            },
          },
          response: [],
        });
      }
    }
  }

  return requests;
}
