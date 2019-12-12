# GDG DevFest Málaga '19 Workshop Utils

Here you will find some useful stuff to follow the workshop.

## Pre-requisites

Click [here](./prerequisites) to check what you need to install before starting.

## Diff files

If at any point of this workshop you get lost, check this diff files to see how components and services evolve during the different phases of development. Don't hesitate to copy & paste any of the files if you get stucked!

* [Diff 1: Basic structure of application](./diff1)
* [Diff 2: Show List of Countries](./diff2)
* [Diff 3: App Completed](./diff3)
* [Diff 4: Unit & Snapshot Tests with Jest](./diff4)
* [Diff 5: E2E Tests with Cypress](./diff5)

## Endpoint url (use UMA Wi-Fi)

Note: correct IP will be added during the event.

http://localhost:3000/countries

## Using your own internet connection? Use json-server!

JSON Server is a simple project that helps you to setup a REST API with CRUD operations really fast. JSON Server is available as a NPM package. The installation can be done using ``npm``:

```
npm install -g json-server
```

Now, execute the following command from this project's root folder:

```
json-server tutorial/chapter-2-developing-our-app/db.json 
```

Open your browser and go to http://localhost:3000/countries. You will see a list of countries in JSON format.

