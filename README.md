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

* Cambiar el prefijo en angular.json (es el nombre que pongamos al crear el workspace inicial)
* ng g component countries
* ng g service countries/countries
* Enseñar que el componente se añade automaticamente al modulo
* Referenciar el componente countries desde root component
* Añadir el HttpClientModule al root module (resolver problema con dependencias)
* Ir al servicio, importar el HttpClient y hacer el get y devolver el observable
* Añadir el servicio al componente, y asignar el resultado a un observable
* Añadir un ngFor con un async y comentar lo que vamos haciendo
* CREAR UN COMPONENTE CITY Y ENVIAR LA CIUDAD EN LA QUE HACEMOS CLICK CON EVENT EMITTER

TESTING CON JEST

TESTING CON CYPRESS


