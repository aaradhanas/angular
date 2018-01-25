# FAQ App [![Build Status](https://travis-ci.org/aaradhanas/angular.svg?branch=master)](https://travis-ci.org/aaradhanas/angular) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/aaradhanas/angular/blob/master/LICENSE) [![codecov](https://codecov.io/gh/aaradhanas/angular/branch/master/graph/badge.svg)](https://codecov.io/gh/aaradhanas/angular)

A simple FAQ application built using Angular. An FAQ contains a question and an answer. A list of FAQs are displayed. By default, the answer is hidden and get displayed on request. The FAQs can be deleted, if not required. Following are the functionalities:

* Add/ Delete FAQ
* List FAQs
* View the answer of an FAQ
* Delete an FAQ


## Technologies used

* Angular
* Bootstrap

## Run application

The project does not contain the dependent node modules. To have the app running on your machine, do the following:

* Go to the project working directory
* Run `npm install`
* Run `ng serve` for a dev server.

## Static code analysis

TSLint is a tool used for static code analysis of typescript files. The configuration for the same is specified in the tsconfig.json file present in the project root. Run the command `ng lint` to do the code analysis.

You can now view the app by navigating to `http://localhost:4200/`.