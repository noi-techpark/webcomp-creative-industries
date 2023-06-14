<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Webcomponent for creative industries map

This project will display a map with the entities located in South Tyrol and working in the Creative Industries.

Do you want to see it in action? Go to our [web component store](https://webcomponents.opendatahub.com/webcomponent/f1321372-6629-4912-a331-77d5d91dd646)!

![REUSE Compliance](https://github.com/noi-techpark/webcomp-creative-industries/actions/workflows/reuse.yml/badge.svg)
[![CI/CD](https://github.com/noi-techpark/webcomp-creative-industries/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-creative-industries/actions/workflows/main.yml)

## Table of contents

- [Usage](#usage)
- [Gettings started](#getting-started)
- [Linting](#linting)
- [Deployment](#deployment)
- [Docker environment](#docker-environment)
- [Information](#information)

## Usage

Include the webcompscript file `dist/webcomp-creative-industries.js` in your HTML and define the web component like this:

```html
<webcomp-creative-industries locale="en"></webcomp-creative-industries>
```

### Attributes

#### locale

Set the language of the web component with `locale`.

Type: string

Options: "en", "de", "it"

#### width, height

Set the dimensions of the web component with `width` and `height`.

Type: string

Default: width: 100%, height: 100%
 
**Note: You need to specify the unit, e.g. em, px, etc.**

To make the component responsive, you can either modify the entries with JavaScript or set a CSS styling for `webcomp-creative-industries`


## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 / NPM 6

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
git clone git@github.com:noi-techpark/webcomp-creative-industries.git
```
or alternatively:
```bash
git clone https://github.com/noi-techpark/webcomp-creative-industries.git
```

Change directory:

```bash
cd webcomp-creative-industries/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:8080](http://localhost:8080).

## Linting

Linting can be executed with the following commands:

```bash
npm run lint
```

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "npm install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "npm run start"
```

## Information

### Support

For support, please contact [help@opendatahub.com](mailto:help@opendatahub.com).

### Contributing

If you'd like to contribute, please follow the Contributor Guidelines that can be found at [https://github.com/noi-techpark/odh-docs/wiki/Contributor-Guidelines%3A-Getting-started](https://github.com/noi-techpark/odh-docs/wiki/Contributor-Guidelines%3A-Getting-started).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.

### REUSE

This project is [REUSE](https://reuse.software) compliant, more information about the usage of REUSE in NOI Techpark repositories can be found [here](https://github.com/noi-techpark/odh-docs/wiki/Guidelines-for-developers-and-licenses#guidelines-for-contributors-and-new-developers).

Since the CI for this project checks for REUSE compliance you might find it useful to use a pre-commit hook checking for REUSE compliance locally. The [pre-commit-config](.pre-commit-config.yaml) file in the repository root is already configured to check for REUSE compliance with help of the [pre-commit](https://pre-commit.com) tool.

Install the tool by running:
```bash
pip install pre-commit
```
Then install the pre-commit hook via the config file by running:
```bash
pre-commit install
```

