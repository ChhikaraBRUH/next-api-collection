import fs from "node:fs/promises";

export default async function generatePostmanCollectionJSON(requests) {
  try {
    await fs.writeFile(
      "./postmanCollection2.1.json",
      JSON.stringify(generatePostmanCollection(requests))
    );

    console.log("Postman collection generated successfully");
  } catch (error) {
    console.log("Error generating postman collection");
    console.error(error);
  }
}

function generatePostmanCollection(requests) {
  return {
    info: {
      name: "Next.js API",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: formatRequestsInFolders(requests),
  };
}

function formatRequestsInFolders(requests) {
  const folders = {};

  for (const request of requests) {
    const folderName = request.name.split(" ")[0];
    if (!folders[folderName]) {
      folders[folderName] = [];
    }
    folders[folderName].push(request);
  }

  return Object.entries(folders).map(([name, requests]) => ({
    name,
    item: requests,
  }));
}
