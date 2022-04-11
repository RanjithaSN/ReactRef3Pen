# Selfcare

## Getting Started
Download required dependencies to run the Selfcare project
* NodeJS@>=8.12.0(https://nodejs.org/en/) 
* Yarn(https://yarnpkg.com/en/docs/install)

## Building Selfcare
To execute a build for the Selfcare project, open a command prompt for this folder and use the command:
```
yarn build prod
```
This will generate a dist folder with all of the assets required to host the reference application.

## Generating a Custom CSS File
To generate a CSS file with a custom brand, you'll first need to update the appropriate variables in the _variables.scss file in Selfcare-UI.  

To see the results of these changes, first ensure that you have linked Selfcare-UI with the Selfcare project.  This can be done by ensuring you have both projects cloned locally.

### Setting up NPM Link
Next, navigate to the folder you've cloned Selfcare-UI into.  Ensure you've installed all dependencies by entering:
```
yarn
```
Next, enter the command:
```
yarn link
```
This will generate a symlink for the Selfcare-UI project on your machine.  Next, navigate to the folder you've cloned Selfcare into, and run:
```
yarn
```
to install all of the dependencies.  Next, run the command:
```
yarn link selfcare-ui
```
to instruct Yarn/NPM to use your symlink for Selfcare-UI.

### Viewing Local Changes
With your projects linked, you are now ready to make changes to the variables in the _variables.scss file.  To see the results of these changes, run the following command for Selfcare:
```
yarn storybook
```
As you make changes to the variables, you should be able to see those changes replicated in the stories in Storybook.  You may need to refresh the browser to see certain changes take effect.

### Generate CSS
Once you're happy with your changes, run the production build task in the Selfcare project by entering this command:
```
yarn build prod
```
Be sure you're still using your symlink for Selfcare-UI otherwise the new CSS will not contain your changes.  The CSS bundle you can use with your changes will be in the dist folder, starting with the word "main".  These files are hashed for cache busting purposes, but you can rename it to anything you'd like to host it in your environment.