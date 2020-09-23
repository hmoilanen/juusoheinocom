# juusoheino.com  


### Installation

In the desired location, install the dependencies and start the server.

```
$ cd foldername
$ npm install
$ npm run serve
```

### Portfolio

This project / code is about displaying my level of skill and should be seen as a **portfolio** built in order to get a job. As a webpage it definitely is an overkill but the reasoning lies in showing what I'm able to do as pervasive as possible. The code is about to be updated if seen necessary.

### General

The actual frontend is built with [Vue.js](https://vuejs.org/) and it has been chosen in the beginning for it's gentle learning curve as well as it's rising popularity and potential to become one of the industry standards.

The content of webpage is served by Google's [Firebase](https://firebase.google.com/). It's easy and fast to get started with and is efficient with small projects from the get-go.

Later on, I still decided to built an own server for the sake of security matters as well as just showing I can do it, :D, in which I used [Node.js](https://nodejs.org/en/) / [Express](https://expressjs.com/).

The philosophy of usage of technologies may not be the most optimal in every aspect but should be seen from the learning process' point of view.

### Structure

The application strongly relies on base components which are used as much as possible. Most of them are in use in multiple places / cases but some just maybe for once. This is because I have been building a "bank" of those just to enable me to execute differrent projects fast and efficiently just by bringing them in. Base components are named with prefix _Base... and are enabled to be used globally without registering separately.

Other components, if view / route related, are named based on their parents as viewXxx -> viewXxxChild etc. All components and code generally follow the Vue's official suggestions of best practices.

Once logged in the webpage includes implemented interface and custom admin tools for editing it's text and image content on site.

### Testing

Unit testing is done with [Jest](https://jestjs.io/) and e2e with [Cypress](https://www.cypress.io/). Some of the most used base componets are tested but the main focus is on setting smoke tests for the most important functionalities of the app. To be fully honest, it's mainly executed casually just to show I can do it though. :)

### Other

juusoheino.com relies also on:
* animation of HTML elements, see: [GSAP3](https://greensock.com/gsap/)
* 3D animations, see: [three.js](https://threejs.org/)
* positioning of popovers / tooltips, see: [popper.js](https://popper.js.org/)