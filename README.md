# <img src="static/assets/img/logo.png" height="100" style="float:left;">
[![CircleCI](https://circleci.com/gh/SDHacks/SDHacks2017.svg?style=svg)](https://circleci.com/gh/SDHacks/SDHacks2017) [![Heroku](http://heroku-badge.herokuapp.com/?app=sdhacks2017-prod&style=flat)](https://www.sdhacks.io/)

# SD Hacks 2017

The website behind the third annual SD Hacks

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

MongoDB
```
Download from https://www.mongodb.com/
Install locally
Note username and password at installation
```

NodeJS
```
Download v6.11.1 LTS from https://nodejs.org/
Install locally
```

Git
```
Download from https://git-scm.com/
Install locally
```

### Installing

Clone the latest version of the master branch to the current directory

```
git clone https://github.com/SDHacks/SDHacks2017.git
```

Navigate into the new directory
```
cd SDHacks2017
```

Copy over the default environment variables file, and modify the contents
```
cp .env.example .env
vim .env
```

Install the npm dependencies for the project
```
npm install
```

To test the installation, run up the server
```
gulp
```

## Running the tests

Our testing system is still under development, and has not been standardised yet.

### And coding style tests

The ```.eslintrc``` file is included in the root of the project, and is followed strictly by all contributors.

## Deployment

This project was built to be tested with CircleCI, and to be hosted by Heroku.
Included are ```circle.yml``` and ```Procfile``` files for their configuration.

## Built With

* [React](https://facebook.github.io/react/) - The front-end JS web framework
* [Bootstrap 4](https://v4-alpha.getbootstrap.com/) - CSS framework for front-end design
* [Express](http://expressjs.com/) - Back-end server framework for Node.js
* [Mongoose](http://mongoosejs.com/) - Back-end database framework for MongoDB

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/SDHacks/SDHacks2017/tags). 

## Authors

* **Nicholas Thomson** - *Back-end Development and System Architecture* - [RedbackThomson](https://rdbk.tv/)
* **Vincent Liaw** - *Front-end Design and Development* - [liawesomesaucer](https://github.com/liawesomesaucer)

See also the list of [contributors](https://github.com/SDHacks/SDHacks2017/contributors) who participated in this project.