# University Search Engine

A small web application to search university all around the world!

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.\
Node.js >=14.15.1 - [Download & Install Node.js](https://nodejs.org/en/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

### Quick Instsall

Once you've downloaded and installed all the prerequisites, you're just a few steps away from starting to develop this web application.

To install the dependencies, run this in the application folder from the command-line:

```
# If you're using npm
npm install

# If you're using yarn
yarn
```

This command will install the dependencies needed for the application to run.

### Running Your Application

To run this application, do following on the command-line:

```
# If you're using npm
npm run start

# If you're using yarn
yarn start
```

This application should run on port 3000 with the development environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000). That's it!

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` or `nom run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage` or `npm run coverage`

Collect the information about all test and reported to the coverage output folder.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint` or `npm run lint`

To check javascript linting rules. This project extends configuration from:

- ESlint React App
- ESlint Recommeded
- Eslint Plugin Prettier Recommeded
- TypeScript Eslint Recommeded

### `yarn lint:fix` or `npm run lint:fix`

This command also check javascript linting rules, with fixing common problem in the process.

### `yarn prettier` or `npm run prettier`

To check files formating/code stylse in our codebase.

### `yarn format` or `npm run format`

To check files formating/code stylse in our codebase and do the formatting automatically for us.

## Built With

- [Create React App](https://create-react-app.dev/) - Command-line tool from Facebook that allows us to generate a new React project and use a pre-configured webpack build for development.\
- [TypeScript](https://www.typescriptlang.org/) - TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language.\
- [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [CRACO](https://github.com/gsoft-inc/craco) - To customize Create React App configuration without ejecting. This is used to setting up tailwindcss with CRA.
- [Hip University API](https://github.com/Hipo/university-domains-list) - University Domains and Names Data List & API

## Troubleshoot

### Cannot use JSX unless the '--jsx' flag is provided

The problem is VSCode using an older version of typescript (4.0.3), while the typescript version shipped with the project is (4.1.2).

To change the TypeScript version in VSCode:

1. Go to the command palette CTRL+Shift+P.
2. Choose "TypeScript: Select a TypeScript Version...".
3. Choose "Use workspace Version".
