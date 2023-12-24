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

  const getRelevantPath = (routeFile) => {
    return routeFile?.split("app")?.[1]?.replace(/\/route\.(ts|js)$/, "");
  };

  const getUrl = (routeFile) => {
    const relevantPath = getRelevantPath(routeFile);
    return `http://localhost:3000${relevantPath}`;
  };

  const getName = (routeFile) => {
    const relevantPath = getRelevantPath(routeFile);
    return relevantPath
      ?.split("/")
      ?.filter((element) => !nameElementsToRemove.includes(element))
      ?.join(" ")
      ?.trim();
  };

  try {
    for (const routeFile of routeFiles) {
      const filePath = path.join(process.cwd(), routeFile);
      const fileContents = await fs.readFile(filePath, "utf8");
      const lines = fileContents.split("\n");

      const url = getUrl(routeFile);
      const name = getName(routeFile);

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

    if (requests?.length === 0) {
      throw new Error(
        "Could not find any routes. Make sure you are running this command from the root of your Next.js 13+ application and that you have defined at least one API route."
      );
    }

    return requests;
  } catch (error) {
    throw error;
  }
}
