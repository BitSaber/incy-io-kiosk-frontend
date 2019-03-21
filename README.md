# incy.io Kiosk Frontend
[![Build Status](https://jenkins.bitsaber.net/buildStatus/icon?job=BitSaber/incy-io-kiosk-frontend/master)](https://jenkins.bitsaber.net/job/BitSaber/incy-io-kiosk-frontend/master)
[![Quality Gate](https://sonar.bitsaber.net/api/badges/gate?key=INCY-IO-KIOSK-FRONTEND)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Lines](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=lines)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Percentage of comments](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=comment_lines_density)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Complexity to function](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=function_complexity)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Test errors](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=test_errors)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Test failures](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=test_failures)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Test success density](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=test_success_density)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
[![Unti Test Coverage](https://sonar.bitsaber.net/api/badges/measure?key=INCY-IO-KIOSK-FRONTEND&metric=coverage)](https://sonar.bitsaber.net/dashboard/index/INCY-IO-KIOSK-FRONTEND)
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

This repository holds the open source code for [incy.io](https://incy.io) Kiosk frontend component.

## How do I get set up?

These steps primarily apply to a non-Windows platform, but it is absolutely possible developing on Windows too.

* Have [yarn installed](https://yarnpkg.com/lang/en/docs/install).
* Have [git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
* (Optional) Have [Docker CE installed](https://docs.docker.com/install/#supported-platforms)
* (Optional, but highly recommended) Configure your editor of choice to use [ESLint](https://eslint.org/docs/user-guide/getting-started).
    * For ([Neo](https://github.com/neovim/neovim/wiki/Installing-Neovim))[Vim](https://www.vim.org/download.php) (non-neo >=8), using [Worp/Ale](https://github.com/w0rp/ale#3-installation) is highly recommended. For first time vim users, using this in conjunction with [Vim Bootstrap](https://vim-bootstrap.com/) might be a good start.
    * For [Visual Studio Code](https://code.visualstudio.com/Download), using [ESLint from the marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) is highly recommended.
    * For emacs users, `> using emacs`
* Clone this repository i.e.

```sh
git clone https://github.com/BitSaber/incy-io-kiosk-frontend.git
```

* cd into the cloned folder i.e.

```sh
cd incy-io-kiosk-frontend`
```

* Install project dependencies i.e.

```sh
yarn install
```

* Start the appliaction, defaults to `0.0.0.0:3000` which can be accessed by visiting [localhost:3000](http://localhost:3000) i.e.

```sh
yarn start
```

## CI/CD

When making pull requests and branches, [Jenkins](https://jenkins.bitsaber.net/job/BitSaber/job/incy-io-kiosk-frontend/) will run an automated CI/CD pipeline, using technologies such as [SonarQube](https://sonar.bitsaber.net/dashboard?id=INCY-IO-KIOSK-FRONTEND), [Robot Framework](https://robotframework.org/) and [Selenium](https://www.seleniumhq.org/), to name a few. This assures a baseline for code quality. Jenkins also won't let you merge anything unless the [CI/CD Pipeline](https://www.edureka.co/blog/ci-cd-pipeline/) succeeds.

### Jenkins Pipeline

An image of the current CI/CD pipeline is presented below

![Jenkins CI Pipeline](docs/img/jenkins-pipeline-example.png?raw=true "Jenkins CI Pipeline")

## Running Robot Tests Outside Jenkins

These commands are assumed to be run from the root directory of this repository.

_outside docker_ Start the docker container:

```sh
docker run \
    --name jenkins-docker-robot-chrome \
    -v $(pwd):/home/jenkins/incy-io-kiosk-frontend \
    --rm \
    -d \
    --privileged \
    docker.bitsaber.net/devops/jenkins-chrome-71:latest
```

_outside docker_ Attach to it:

```sh
docker exec -it jenkins-docker-robot-chrome su - jenkins
```

_inside docker_ Configure PATH and start dev server:

```sh
PATH="/opt/tools/yarn/yarn-v1.12.3/bin:/opt/tools/nodejs/node-v11.4.0-linux-x64/bin:$PATH"
cd incy-io-kiosk-frontend
yarn start &>/dev/null &
```

_inside docker_ Run robot:

```sh
robot -d robot_reports __tests__/robot
```

_outside docker_ Stop the docker image:

```sh
docker stop jenkins-docker-robot-chrome
```

## Authors

[BitSaber](https://github.com/BitSaber/incy-io-kiosk-frontend/graphs/contributors)
