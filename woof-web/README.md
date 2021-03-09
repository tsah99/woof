# Hi! Welcome to WOOF

## Set up

Begin by cloning this repo onto your local machine. First, run `npm install` in the directory which your app was installed into. Onced cloned and after npm is finished installing the necessary dependencies, you can get started by running `npm start` to run the app in development mode (see below in "Availible Scripts" section for more details).

## Code, style, structure

This app was created using [React](https://reactjs.org). We soley use functional components and React Hooks, to learn more click [here](https://reactjs.org/docs/hooks-intro.html). We recommend developing using [VSCode](https://code.visualstudio.com) with the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension installed to keep proper and consistent styling. 

We control routes in the `Routes.js` page using [React Router](https://reactrouter.com). When adding a new page, ensure that it is added into this file. Here you will find the components for Auth and NonAuth pages and the controller for these. 

Our tree works as follows: App -> Route -> Pages -> Components. Each page and component has its own CSS styling file. For access to our [contexts](https://reactjs.org/docs/context.html), go to the `contexts` folder where you will find example skeletons which you can use for creating your own context (or adding to an existing one). 

If you would like to import your own font (not from a webfont source like google fonts), place it in the `fonts` folder.

For any utilities/libraries which you would like to create for this application, we have provided a `libs` folder.

## Firebase

When you first clone this repository, our personal Firebase credentials are in place. If you wish to connect your own Firebase instance, replace our credentials with yours in the `src/firebaseConfig.js` file. For more info on where to find these configurations, click [here](https://support.google.com/firebase/answer/7015592?hl=en).

## Deployment

After cloning your repository, you may deploy this app using the process of your choice ([AWS Amplify](https://aws.amazon.com/amplify/), [Heroku](https://www.heroku.com), etc). We recommend using AWS for best performance, and connecting your Main branch to AWS to keep your deployed site up to the most recent version. To learn more about this, read [here](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html). Or, you can manually build your application and drop in your build folder to one of the above services by running `npm run build`.

# React specific commands

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Thus, the following commands are all availible to run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
