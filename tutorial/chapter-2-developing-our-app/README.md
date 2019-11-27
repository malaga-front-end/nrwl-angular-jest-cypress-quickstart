[complete-app]: assets/complete-app.png
[components-created]: assets/components-created.png
[app-without-styles]: assets/app-without-styles.png
[app-with-styles]: assets/app-with-styles.png

# Chapter 2: Developing our app

We will create a very simple app to demonstrate how easy is to add new components and their tests: 

![complete-app]

* We will create a component to show a list of countries
* We will create a component to show a city name
* We will communicate both components: when a country is clicked, its capital city will be shown.

## Creating the basic structure of the app

### Generating components with Angular CLI

To create our first component, we need to create a class for its behaviour, a template for its view, a CSS file for styling, and a test file to implement its unit tests. Of course, you need to annotate the component to indicate to Angular that the class should be treated as a component, initialize the unit tests with TestBed in the proper way... Do you think that we are going to do it by hand? No! We are going to use the power of Angular CLI to generate all that we have stated before with a single command line: 

```
ng g component countries
```

This command will generate a folder called ``countries`` inside ``apps/myapp/src/app``, and inside you will find:

* ``countries.component.ts`` - An empty typescript class called ``CountriesComponent`` properly annotated as a ``@Component`` and already linked to its template and styles.
* ``countries.component.html`` - An empty template that represents the view of the component.
* ``countries.component.css`` - To style the component. 
* ``countries.component.spec.ts``- Unit tests for the component already initialized for its first test

To use the component, it should be declared in ``app.module.ts``. Angular CLI also does this task automatically for you! Go to ``app.module.ts`` and check how the component has been automatically added to ``declarations``.

After that, create a component for the city name with Angular CLI:

```
ng g component city
```

This command will generate a folder called ``city`` inside ``apps/myapp/src/app``, and inside you will find the same four files that we explained above.

Do you want to see your brand new components in your browser? Check the ``selector`` property inside the components decorator. Now, add the elements with that name inside ``app.component.html`` (delete first all the previously existing content in ``app.component.html`` and ``app.component.css``).

<pre><b>app.component.html</b></pre>
```diff
+ <myapp-countries></myapp-countries>
+ <myapp-city></myapp-countries>
```

If you go back to the browser, you will see that it has automatically reloaded to show your new components! 

### Generating services with Angular CLI

Now that your components are in place, let's create the services and inject them into the components to create the structure of the application. We will need two services to perform different actions:

* ``CountriesService`` - It will do a HTTP request to retrieve our list of countries.
* ``SharedService`` - It will contain a ``Subject`` to emit events with the city name, and an ``Observable`` to subscribe to in order to receive them.

Let's start creating ``CountriesService``:

```
ng g service countries/countries
```

This command will generate all files inside ``countries`` folder, containing:

* ``countries.service.ts`` - An empty Typescript class called ``CountriesService`` properly annotated as ``@Injectable`` to mark a class as available to be provided and injected as a dependency.
* ``countries.service.spec.ts``- Unit tests for the service already initialized for its first test.

Now, create ``SharedService``:

```
ng g service shared
```

This command will generate all files inside ``app`` folder, containing the same two files that we have explained above.

### Injecting services into components

Now it's time to inject the services into the components to complete the basic structure of the app. We need to do the following:

* Inject ``CountriesService`` into ``CountriesComponent``, to retrieve the list of countries.
* Inject ``SharedService`` into ``CountriesComponent``, to emit the city name when a country is clicked.
* Inject ``SharedService`` into ``CityComponent``, to subscribe for emmited city names.

So, let's do that!

<pre><b>countries.component.ts</b></pre>
```diff
import { Component, OnInit } from '@angular/core';
+ import { CountriesService } from './countries.service';
+ import { SharedService } from '../shared.service';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

-  constructor() { }
+  constructor(
+    private countriesService: CountriesService,
+    private sharedService: SharedService) { }

  ngOnInit() {
  }
}
```

<pre><b>city.component.ts</b></pre>
```diff
import { Component, OnInit } from '@angular/core';
+ import { SharedService } from '../shared.service';

@Component({
  selector: 'myapp-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

-  constructor() { }
+  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }
}
```

Now, the basic structure of the app is ready. We can start adding code to do what we need!

## HTTP Requests with Angular

### Simulate a REST API with JSON Server

We need some data to work with. JSON Server is a simple project that helps you to setup a REST API with CRUD operations really fast. JSON Server is available as a NPM package. The installation can be done using ``npm``:

```
npm install -g json-server
```

Now, execute the following command from this project's root folder:

```
json-server tutorial/chapter-2-developing-our-app/db.json 
```

Open your browser and go to http://localhost:3000/countries. You will see a list of countries in JSON format. The model for a country is:

```
[
  {
    "name": "Afghanistan",
    "capital": "Kabul"
  },
  ...
]
```

Let's create a file called ``country.ts`` inside ``countries`` folder to define the model:

<pre><b>country.ts</b></pre>
```diff
+ export interface Country {
+   name: string;
+   capital: string;
+ }
```

We will use this model later to retrieve the list of countries.

### Using HTTPClient to do a GET request

To perform an HTTP request, we first need to import an Angular module called ``HttpClientModule``. Go to ``app.module.ts`` and add it inside ``imports``.

<pre><b>app.module.ts</b></pre>
```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
+ import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';

@NgModule({
  declarations: [AppComponent, CountriesComponent],
- imports: [BrowserModule],
+ imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Now, go to ``CountriesService`` and import ``HttpClient`` service. This is the service that will allow you to perform requests. Create a method ``getCountries`` to perform a GET request to the provided url.

<pre><b>countries.service.ts</b></pre>
```diff
import { Injectable } from '@angular/core';
+ import { HttpClient } from '@angular/common/http';
+ import { Observable } from 'rxjs';
+ import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

+ private readonly url = 'http://localhost:3000/countries';

-  constructor() { }
+  constructor(private httpClient: HttpClient) { }

+  public getCountries(): Observable<Country[]> {
+   return this.httpClient.get<Country[]>(this.url);
+  }
}
```

### Showing countries in CountriesComponent

Now, we need to call ``getCountries`` on component initialization and save the result in ``countries$``:

<pre><b>countries.component.ts</b></pre>
```diff
import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { SharedService } from '../shared.service';
+ import { Observable } from 'rxjs';
+ import { Country } from './country';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

+ countries$: Observable<Country[]>;

  constructor(
    private countriesService: CountriesService,
    private sharedService: SharedService) { }

  ngOnInit() {
+   this.countries$ = this.countriesService.getCountries();
  }
}
```

Now, edit the template in ``countries.component.html`` to show the results:

<pre><b>countries.component.html</b></pre>
```diff
+ <ul>
+    <li *ngFor="let country of countries$ | async">{{ country.name }}</li>
+ </ul>
```

If you go now to your browser, you should see a list of countries.

![app-without-styles]

<b>Optional:</b> If you want to have a beautiful list of elements, copy into ``countries.component.css`` the styles located in this file: [countries.component.css](./countries.component.css)

![app-with-styles]

## Comunication between components

We want the following behaviour: when clicking on a country, we want to show its capital.

As we have stated before, we need ``SharedService`` in both components. ``CountriesComponent`` will use this service to emit an event with the name of the city, and ``CityComponent`` will use it to listen to that event.

We are going to use a ``Subject`` and an ``Observable`` to do the communication. We won't go too much into the details about how observables work here since it's a big subject, but in a nutshell there are two methods that we're interested in: ``Observable.subscribe()`` and ``Subject.next()``.

* <b>Observable.subscribe()</b>: This method is used to subscribe to messages that are sent to an observable. In our case the subscription will be automatically handle by the angular pipe ``async``, the advantage of this is that we don't need to worry to unsubscribe to the observable when it is completed.
* <b>Subject.next()</b>: This method is used to send messages to an observable which are then sent to all the angular components that are subscribers of that observable.

<pre><b>shared.service.ts</b></pre>
```diff
import { Injectable } from '@angular/core';
+ import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
+  private subject: Subject<string> = new Subject<string>();
+  private city$: Observable<string> = this.subject.asObservable();
  
-  constructor() { }
  
+  sendCity(city: string) {
+    this.subject.next(city);
+  }

+  getCity() {
+    return this.city$;
+  }
}
```

<b>Optional:</b> If you want to display the name of the city in a beautiful way, copy into ``city.component.css`` the styles located in this file: [city.component.css](./city.component.css)

With our service ready to send and receive values, we can edit both components to finish our app.

First we will edit ``countries.component.ts`` to add a method to send the city.

<pre><b>countries.component.ts</b></pre>
```diff
import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { Country } from './country';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries$: Observable<Country[]>;

  constructor(private countriesService: CountriesService, private sharedService: SharedService) { }

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries();
  }

+  sendCity(city: string) {
+    this.sharedService.sendCity(city);
+  }
}
```

And after that, we will execute ``sendCity`` on click event.

<pre><b>countries.component.html</b></pre>
```diff
<ul>
-    <li *ngFor="let country of countries$ | async">{{ country.name }}</li>
+    <li *ngFor="let country of countries$ | async" (click)="sendCity(country.capital)">{{ country.name }}</li>
</ul>
```

Second, we will create a method ``getCity`` in ``city.component.ts`` to retrieve the ``Observable``:

<pre><b>city.component.ts</b></pre>
```diff
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'myapp-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

+  getCity() {
+    return this.sharedService.getCity();
+  }

}
```

Now we are going to handle the subscription automatically using the angular pipe ``async`` to receive the cities sent from ``CountriesComponent`` through the ``subject.next()``.

<pre><b>city.component.html</b></pre>
```diff
- <p>city works!</p>
+ <h1 *ngIf="getCity() | async as city">{{ city }}</h1>
```

Go back to your browser and click on a country. You should see its capital city on screen.

![complete-app]

We have finished developing our app. Let's start testing it!

Continue to [Chapter 3: The Front End Testing Pyramid](../chapter-3-the-fe-testing-pyramid).

