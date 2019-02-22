# Kiosk Frontend
[![Build Status](https://jenkins.bitsaber.net/buildStatus/icon?job=BitSaber/incy-io-kiosk-frontend/master)](https://jenkins.bitsaber.net/job/BitSaber/incy-io-kiosk-frontend/master)

This repository holds the open source code for a Kiosk frontend application.

## How do I get set up?

To start, you need to have `yarn` installed. This can be done according to [yarn installation guide](https://yarnpkg.com/lang/en/docs/install). When this is done, install the dependencies needed for developing this project by running `yarn install`. After this, you should be able to run `yarn start`, and navigage to [the dev server running on port 3000](http://localhost:3000).
In case you are running your browser from a different computer than you are running `yarn` from, please use the IP or hostname of the computer running yarn instead of localhost.

When hopping different branches, it might be a good idea to run `rm -rf node_modules && yarn install` to have a clean set of dependencies.

## CI

When making pull requests and branches, [Jenkins](https://jenkins.bitsaber.net) accompanied by [SonarQube](https://sonar.bitsaber.net/dashboard?id=INCY-IO-KIOSK-FRONTEND) will automatically verify that the code is good enough. Jenkins also won't let you merge anything if the [CI](https://en.wikipedia.org/wiki/Continuous_integration) pipeline fails.

### Jenkins Pipeline

![Jenkins CI Pipeline](docs/img/jenkins-pipeline-example.png?raw=true "Jenkins CI Pipeline")


## Author

BitSaber Team
