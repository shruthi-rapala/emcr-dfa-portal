# emcr-dfa-portal
To collaborate while creating a new DFA public portal.

# Development Requirements

## dfa-public

### UI

DFA Public uses GitHub actions to build the software.

The Github Action does a Docker Build

The Docker Build uses trion/ng-cli-karma as the base.

As such, start with setting your Node version to the current version.   As of 6/20/2024 this was Node.js 20.14.0 (from lts-slim, the parent of trion/ng-cli).

`nvm install 20.14.0`
`nvm use 20.14.0`

You will also need to install the Angular CLI as of 6/20/2024 this was 18.0.4

`npm install -g @angular/cli@18.0.4`

These versions will change over time; the DFA Public build uses the current image for trion/ng-cli-karma.

Trion also installs a few other libraries:

`npm install -g pnpm`

Next, do a package install:

`npm ci`

Then you can start the front end:

`npm start`

Use Edge to go to the local dev environment.




