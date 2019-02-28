# Kiosk Frontend
[![Build Status](https://jenkins.bitsaber.net/buildStatus/icon?job=BitSaber/incy-io-kiosk-frontend/master)](https://jenkins.bitsaber.net/job/BitSaber/incy-io-kiosk-frontend/master)
[![Quality Gate](https://sonar.bitsaber.net/api/badges/gate?key=INCY-IO-KIOSK-FRONTEND)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Lines](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=lines)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Percentage of comments](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=comment_lines_density)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Complexity to function](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=function_complexity)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Test errors](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=test_errors)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Test failures](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=test_failures)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Test success density](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=test_success_density)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Unti Test Coverage](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=coverage)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Integration Test Coverage](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=it_coverage)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Overall Test Coverage](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=overall_coverage)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Duplicated Lines Density](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=duplicated_lines_density)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Blocker Violations](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=blocker_violations)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Critical Violations](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=critical_violations)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Code Smells](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=code_smells)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Bugs](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=bugs)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Vulnerabilities](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=vulnerabilities)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Technical Debt Ratio](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=sqale_debt_ratio)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![New Maintainability Rating](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=new_maintainability_rating)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![New Reliability Rating](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=new_reliability_rating)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![New Security Rating](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=new_security_rating)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)

This repository holds the open source code for a Kiosk frontend application.

## How do I get set up?

To start, you need to have `yarn` installed. This can be done according to [yarn installation guide](https://yarnpkg.com/lang/en/docs/install). When this is done, install the dependencies needed for developing this project by running `yarn install`. After this, you should be able to run `yarn start`, and navigage to [the dev server running on port 3000](http://localhost:3000).
In case you are running your browser from a different computer than you are running `yarn` from, please use the IP or hostname of the computer running yarn instead of localhost.

When hopping different branches, it might be a good idea to run `rm -rf node_modules && yarn install` to have a clean set of dependencies.

## CI/CD

When making pull requests and branches, [Jenkins](https://jenkins.bitsaber.net/job/BitSaber/job/incy-io-kiosk-frontend/) accompanied by [SonarQube](https://sonar.bitsaber.net/dashboard?id=INCY-IO-KIOSK-FRONTEND) will automatically verify that the code is good enough. Jenkins also won't let you merge anything unless the [CI](https://en.wikipedia.org/wiki/Continuous_integration) pipeline succeeds.

### Jenkins Pipeline

Below you will find an example of our CI/CD pipeline

![Jenkins CI Pipeline](docs/img/jenkins-pipeline-example.png?raw=true "Jenkins CI Pipeline")

### Robot Framework

Start the docker image:

```
docker run \
    --name jenkins-docker-robot-chrome \
    -v $(pwd):/home/jenkins/incy-io-kiosk-frontend \
    --rm \
    -d \
    --privileged \
    docker.bitsaber.net/devops/jenkins-chrome-71:latest
```

Attach to it:

```
docker exec -it jenkins-docker-robot-chrome su - jenkins
```

Configure PATH and start dev server:

```
PATH="/opt/tools/yarn/yarn-v1.12.3/bin:/opt/tools/nodejs/node-v11.4.0-linux-x64/bin:$PATH"
cd incy-io-kiosk-frontend
yarn start &>/dev/null &
```

Run robot

```
robot __tests__/robot
```

Stop the docker image:

```
docker stop jenkins-docker-robot-chrome
```

## Authors

[BitSaber](https://github.com/BitSaber/incy-io-kiosk-frontend/graphs/contributors)
