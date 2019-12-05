![tray.io](http://images.tray.io/static/brand/logos/on_white/logo.png)

# About the website app

The purpose of the repo is to server as the foundation boilerplate for any applications we are looking to spin up. It should have all the necessary tooling already installed.

# Running the website app

To run the app follow the steps:

## Install Node & Yarn

Before doing anything, you need `node.js` to be installed, follow the instructions for your OS here: https://nodejs.org/en/download/package-manager/ Check inside `package.json` under the `engine` key which version we use. you will also need `yarn`: https://yarnpkg.com/lang/en/.

## Run the app

```console
yarn install
yarn start
```

Now the app should be running on http://localhost:3000

## Production mode

If you want to run the website in production mode locally, simply run `yarn run prod`. This is a combination of `yarn run build:prod` and `yarn run start:prod` which builds the production files, then runs them using a local server respectively.

## Other notable commands

- `yarn run test` to test
- `yarn run lint` to lint
- `yarn run storybook` to run storybook
