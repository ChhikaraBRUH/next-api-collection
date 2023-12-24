#!/usr/bin/env node

import findApiDir from "../findApiDir.js";
import findRouteFiles from "../findRouteFiles.js";
import getRequests from "../getRequests.js";
import generatePostmanCollectionJSON from "../generatePostmanCollectionJSON.js";

try {
  const apiDirPath = await findApiDir();
  if (!apiDirPath) {
    throw new Error(
      "Could not find 'api' directory. API directory must be named 'api' and be located in the 'app' directory of the Next.js 13+ application. Try running this command from the root of your application."
    );
  }

  const routeFiles = await findRouteFiles(apiDirPath);
  const requests = await getRequests(routeFiles);

  generatePostmanCollectionJSON(requests);
} catch (error) {
  console.error(error);
}
