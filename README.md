[countries-app]: assets/countries-app.png

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
``countries.component.spec.ts``- Unit tests for the component already initialized for its first test

To use the component, it should be declared in ``app.module.ts``. Angular CLI also does this task automatically for you! Go to ``app.module.ts`` and check that the component has been automatically added to ``declarations``.

Do you want to see your brand new component in your browser? Check the ``selector``property inside the component decorator. Now, add an element with that name inside the root component, that is called ``app.component.html`` (delete first all the previously existing content there).

```
<app-countries></app-countries>
```

If you go back to the browser tab that is showing our app, you will see that it has automatically reloaded to show your new component! 

## Adding our Services

Now that we have our CountriesComponent in place, let's populate it! We need to create a server for this porpuse. We will create a method inside it that will do a GET request to retrieve the data that we need. Use the following command:

```
ng g service countries/countries
```

This command will generate all the files inside ``countries``component, containing:

``countries.service.ts`` - An empty typescript class called ``CountriesService`` properly annotated as a ``@Injectable`` to mark a class as available to be provided and injected as a dependency.
``countries.service.spec.ts``- Unit tests for the service already initialized for its first test.

To perform the HTTP call, we first need to import an Angular module called ``HttpClientModule``. Go to ``app.module.ts`` and add it inside ``imports``.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';

@NgModule({
  declarations: [AppComponent, CountriesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Now, go to ``CountriesComponent`` and import ``HttpClient`` service. This is the service that will allow you to perform an HTTP call. Additionally, create a method ``getCountries`` to do a GET to the provided url.

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly url = 'http://localhost:3000/countries';

  constructor(private httpClient: HttpClient) { }

  public getCountries() {
    return this.httpClient.get(this.url);
  }
}
```

### Injecting the service into the component

Now that we have our service ready, we need to inject it into our component and call ``getCountries`` from there when initializing the component. 

```
import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries$: any;

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries();
  }
}
```

Now, we will edit our template in ``countries.component.html`` to show the results:

```
<ul>
    <li *ngFor="let country of countries$ | async">{{ country.country }}</li>
</ul>
```

If you go now to your browser, you should see a list of countries.

## Component interaction

We want the following behaviour: when clicking on a country, we want to show its capital.

To do that, we need to introduce a second component called ``CityComponent``, and a service to communicate them: we will call it ``SharedService`` for learning purposes. ``CountriesComponent`` will use this service to emit an event with the name of the city, and ``CityComponent`` will use it to listen to that event.

Create the new component using this command:

```
ng g component city
```

Add the content of the template:

```
<div class="city">
  <h1>
    {{ city }}
  </h1>
</div>
```

Add some styles to allocate it on top right of the screen:

```
.city {
    position: fixed; 
    top: 0; 
    right: 20px;
}
```

Now that we have both components created, we will create our ``SharedService`` to communicate them:

```
ng g service shared
```

We will create a ``Subject``, transform it into an ``Observable`` and create methods to emit the value and get the observable stream.

```
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   // Observable string sources
   private citySource = new Subject<string>();
 
   // Observable string streams
   city$ = this.citySource.asObservable();
 
   // Service message commands
   emitCity(city: string) {
     this.citySource.next(city);
   }

   getCity() {
     return this.city$;
   }
}
```

With our service ready to emit and receive values, we can edit both components to finish our app.

First we will edit ``countries.component.ts`` to add a method to emit the value.

countries.component.ts
```
export class CountriesComponent implements OnInit {

  ...

  constructor(private countriesService: CountriesService, private cityService: CityService) { }

  ...

  selectCountry(city: string) {
    this.cityService.emitCity(city);
  }
}
```

And after that, we will associate the click event to that method.

countries.component.html
```
<ul>
    <li *ngFor="let country of countries$ | async" (click)="selectCountry(country.city)">{{ country.country }}</li>
</ul>
```

Second, we will inject the service in ``city.component.ts``:

city.component.ts
```
export class CityComponent {
  constructor(public cityService: CityService) { }
}
```

And we will wait for the ``Observable`` to be resolved with the ``async`` pipe.

city.component.html

```
<div class="city">
  <h1 *ngIf="cityService.getCity() | async as city">
    {{ city }}
  </h1>
</div>
```

If you now go back to your browser, you will see that when you click on a country, you can see its capital city!

## Unit testing with Jest
Now that we have a working app it's time to test each piece of it (components, services...) to ensure that everything works as we expect and be able to do changes not having to be afraid of breaking something by mistake.

### Testing our first component: CountriesComponent
As we used Angular CLI to create our component we have an initial set up to start covering our component with more tests.

`CountriesComponent` shows a list of elements that you can click to send data somewhere else, then we need two different tests:
1. Test that we render a list of elements.
2. Test that when we click on an element we send the expected value associated with that element.

So let's start testing!

Go to ``countries.component.spec.ts``. You will find a file with a single test:

```typescript
it('should create', () => {
  expect(component).toBeTruthy();
});
```

If you check our `CountriesComponent` you will see that we are importing two services (`CountriesService` and `CityService`). We need to add both services to the TestBed as providers.

```typescript
TestBed.configureTestingModule({
  declarations: [ CountriesComponent ],
  providers: [ CountriesService, CityService ]
})
```

This will inject our services in the context but remember that our goal is to unit test `CountriesComponent`, not its dependencies, so we need to mock both services to get rid of side effects and be able to spy on them and check if they are being used or to change what they are returning.

Jest makes mocking a super easy thing, we just need to use `jest.mock(PATH_TO_YOUR_SERVICE)`.

```typescript
jest.mock('./countries.service');
jest.mock('../city.service');
```

Now we are going to get our services from the testing context and store them in a variable so we can use them.

```typescript
countriesService = TestBed.get(CountriesService);
cityService = TestBed.get(CityService);
```

We don't want `CountriesServices` to perform an HTTP call to retrieve the list of countries so we have to mock `getCountries()` to return what we want.

```typescript
jest.spyOn(countriesService, 'getCountries').and.returnValue(of([
  { country: 'Spain', city: 'Madrid' },
  { country: 'France', city: 'Paris'}
]));
```

To check that we emit a city whenever we click on an element we need to create a spy that will tell us if `emitCity` has been called or not.

```typescript
jest.spyOn(cityService, 'emitCity');
```

Finally we can add our test cases.

We want to test what it's being rendered. To do that we can take advantage of the jest snapshots.

```typescript
it('should render component', () => {
  expect(fixture).toMatchSnapshot();
});
```

This will create a folder named `__snapshots__` at the same level of our test with a file `countries.component.speec.ts.snap`. 
```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`CountriesComponent should render component 1`] = `
<nrwl-angular-jest-cypress-countries
  cityService={[Function CityService]}
  countries$={[Function Observable]}
  countriesService={[Function CountriesService]}
>
  <div>
    <ul>
      
      <li>
        Spain
      </li>
      <li>
        France
      </li>
    </ul>
  </div>
</nrwl-angular-jest-cypress-countries>
`;

```

The content of this file is the HTML generated by our component.

Next time we run the test jest will compare the new generated HTML against the one in this file, if both matches the test will pass, if not, the test will fail.

What if my test fail because I introduced a change in the HTML? Well, then you need to check that the difference between the snapshot and the result is the expected one, if so, you just need to run the test with a flag to tell jest to update that spanshot with the new HTML.

```
ng test -u
```

SEGUIR CON LOS DEMAS UNIT TESTS

TESTING CON CYPRESS


