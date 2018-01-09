# Showdown editor using Angular 4 [![Build Status](https://travis-ci.org/aaradhanas/angular.svg?branch=master)](https://travis-ci.org/aaradhanas/angular)

This project is inspired by the works of the developers of Showdown editor. The existing showdown editor `http://demo.showdownjs.com/` has been developed using AngularJS (Version 1 of Angular). The editor has been rewritten in Angular 4 in a simpler and easier way.

## Angular 4 components

Since Angular 2 and higher make use of components for better readability and resuability, the same has been applied here and the editor has been divided into the following components.

- Left navigation bar, which contains the various showdown options
- Top navigation bar
- Editor section, which comprises the editor and the preview.

## Angular 4 services

In order to access the information related to the available releases and sample markdown content, one service has been created.

## External fonts

Font-awesome and google fonts has been used here. These have been installed using npm, as follows:

- `npm install font-awesome@4.4.0 --save`
- `npm install google-fonts@latest --save`

## Node package for showdown

The node package `https://www.npmjs.com/package/ngx-showdown` has been used to process the showdown content and render it.

- npm install ngx-showdown --save
- Add the **ShowdownModule** to the imports of app.module.ts
- `<showdown [value]="<<showdown text>>"></showdown>`

## How to run ?

- Check out the project
- Go to the root folder
- Run ng serve

## Tasks to do

- Left navigation bar rendering and value change events
- Adding basic tests using Karma