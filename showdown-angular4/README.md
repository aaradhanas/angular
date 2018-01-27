# Showdown editor using Angular 4 [![Build Status](https://travis-ci.org/aaradhanas/angular.svg?branch=master)](https://travis-ci.org/aaradhanas/angular) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/aaradhanas/angular/blob/master/LICENSE)

This project is inspired by the works of the developers of Showdown editor. The [existing showdown editor](http://demo.showdownjs.com/) has been developed using AngularJS (Version 1 of Angular). The editor has been rewritten in Angular 4 in a simpler and easier way.

## Angular 4 components

Since Angular 2 and higher make use of components for better readability and resuability, the same has been applied here and the editor has been divided into the following components.

- Left navigation bar, which contains the various showdown options
- Top navigation bar
- Editor section, which comprises the editor and the preview.

## Angular 4 services

In order to access the information related to the available releases and sample markdown content, one service has been created.

## External fonts

Font-awesome and google fonts has been used here. These have been installed using npm, as follows:

- npm install font-awesome@4.4.0 --save
- npm install google-fonts@latest --save

## Node package for showdown

- npm install showdown --save
- const showdownJs = require('showdown');
- const converter = new showdownJs.Converter(); 
- converter.makeHtml("text");

## Publish the app as Github page

- npm install -g angular-cli-ghpages --save 
- ng build --prod --base-href https://aaradhanas.github.io/angular/
- ngh

## How to run ?

- Check out the project
- npm install
- ng serve

## Tasks to do

- Adding basic tests using Karma

## License

- [MIT license](https://github.com/aaradhanas/angular/blob/master/LICENSE)