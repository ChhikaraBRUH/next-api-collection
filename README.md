# Next.js to Postman API Collection Generator

This is a simple API documentation generator for Next.js applications. It generates a Postman collection from your Next.js API routes.

## Installation

You can install this package globally with npm, yarn, or pnpm:

```sh
npm install -g next-postman

# or

yarn global add next-postman

# or

pnpm install next-postman -g
```

## Usage

To generate a Postman collection, run the following command in your Next.js project base directory:

```sh
next-postman
```

This will generate a `postmanCollection2.1.json` Postman 2.1 Collection file in your project directory. You can import this file into Postman to have all your API routes as a collection in Postman.

## How it works

The script works by scanning your project for API route files (files named `route.js` or `route.ts` in the `api` directory under the `app` router directory). It then reads these files to determine the HTTP methods (GET, POST, PUT, PATCH, DELETE) used in each route. This information is used to generate a Postman collection.

## Limitations

This script is very simple and has some limitations:

- It only works with Next.js projects that use the `app` router of Next.js 13 or later.
- It only works with API routes that are defined in files named `route.js` or `route.ts` in the `api` directory under the `app` router directory.
- The script only recognizes the following HTTP methods: GET, POST, PUT, PATCH, DELETE. These should be exported from the route file as is done in the Next.js documentation. See [here](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) for more information.
- The script does not parse the route files in depth, it simply looks for the HTTP methods in the file contents. Therefore, it may not accurately represent your API if your route files are complex.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. Feel free to use it however you like.
