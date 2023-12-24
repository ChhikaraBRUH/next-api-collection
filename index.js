import findApiDir from "./findApiDir.js";
import findRouteFiles from "./findRouteFiles.js";
import generatePostmanCollectionJSON from "./generatePostmanCollectionJSON.js";
import getRequests from "./getApiRoutes.js";

const apiDirPath = await findApiDir();
const routeFiles = await findRouteFiles(apiDirPath);
const requests = await getRequests(routeFiles);

generatePostmanCollectionJSON(requests);
