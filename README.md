# nrwl-angular-jest-cypress-quickstart
Nrwl+Angular+Jest+Cypress Quickstart. Create your app in less than 1 hour!

## Prerequisites

Before creating the application, you need to install some tools.

### Git

If you are using Mac OS, and you have installed XCode, Git may already be installed. To find out, open a terminal and enter ``git version``.

If that's not the case, or you have a different OS, follow the instructions here for your favourite OS:

https://www.atlassian.com/git/tutorials/install-git

### NodeJS

Download LTS version of NodeJS. With this we will be able to use Node Package Manager (npm).

https://nodejs.org/en/download/

## Packages that will make your life easier

### Angular CLI

The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications. You can use the tool directly in a command shell, or indirectly through an interactive UI such as Angular Console.

Install the CLI using the ``npm`` package manager:

```
npm install -g @angular/cli
```

### Nx: 

Nx is a set of extensible dev tools for monorepos. With Nx, you can:

* Use modern tools like Cypress, Jest, Prettier, TypeScript, and others.
* Build full-stack applications using Angular, and Node.js.
* Use effective development practices pioneered at Google, Facebook, and Microsoft.

Install Nx using ``npm``package manager:

```
npm i -g @nrwl/nx
```

## Getting Started

### Create your workspace

```
npm init nx-workspace myworkspace
```

You will need to answer a few questions to setup your application:

*What to create in the new workspace?* angular (a workspace with a single angular application)
*Application Name?* myapp
*Default stylesheet format* CSS (we will not style anything here)

It will start to download and setup your initial app. Jest (Unit testing) and Cypress (E2E) dependencies will be automatically added.

### Serving application

After initial setup, you only need to serve your application to start working!

```
ng serve
```

Go to http://localhost:4200 to see the initial app that Nx has prepared for you.

To execute the unit tests of the application:

```
ng test
```

To execute the e2e tests of the application:

```
ng e2e
```

## Adding our components

We will create a very simple app to demonstrate how easy is to add new components and their tests: 

[Insert image here]

* We will create a component to show a list of countries
* We will create a component to show a city name
* We will communicate both components: when a country is clicked, its capital city will be shown.

### Our first component: CountriesComponent

To create our first component, we need to create a class for its behaviour, a template for its view, a CSS file for styling, and a test file to implement its unit tests. Of course, you need to annotate the component to indicate to Angular that the class should be treated as a component, initialize the unit tests with TestBed in the proper way... Do you think that we are going to do it by hand? No! We are going to use the power of Angular CLI to generate all that we have stated before with a single command line: 

```
ng g component countries
```

This command will generate a folder called ``countries`` inside ``src/app``, and inside you will find:

``countries.component.ts`` - An empty typescript class called ``CountriesComponent`` properly annotated as a ``@Component`` and already linked to its template and styles.
``countries.component.html`` - An empty template that represents the view of the component.
``countries.component.css`` - To style the component. 
``countries.component.spec.ts``- Unit tests for the component already initialized for its first dummy tests

To use the component, it should be declared in ``app.module.ts``. Angular CLI also does this task automatically for you! Go to ``app.module.ts`` and check that the component has been automatically added to ``declarations``.

Do you want to see your brand new component in your browser? Check the ``selector``property inside the component decorator. Now, add an element with that name inside the root component, that is called ``app.component.html`` (delete first all the previously existing content there).

```
<app-countries></app-countries>
```

If you go back to the browser tab that is showing our app, you will see that it has automatically reloaded to show your new component! 

* ng g service countries/countries
* Añadir el HttpClientModule al root module (resolver problema con dependencias)
* Ir al servicio, importar el HttpClient y hacer el get y devolver el observable
* Añadir el servicio al componente, y asignar el resultado a un observable
* Añadir un ngFor con un async y comentar lo que vamos haciendo
* CREAR UN COMPONENTE CITY Y ENVIAR LA CIUDAD EN LA QUE HACEMOS CLICK CON EVENT EMITTER

TESTING CON JEST

TESTING CON CYPRESS


