[complete-app]: assets/complete-app.png
[app-without-styles]: assets/app-without-styles.png
[app-with-styles]: assets/app-with-styles.png

# Chapter 2: Developing our app

We will create a very simple app to demonstrate how easy is to add new components and their tests: 

![complete-app]

* We will create a component to show a list of countries
* We will create a component to show a city name
* We will communicate both components: when a country is clicked, its capital city will be shown.

## Our first component: CountriesComponent

To create our first component, we need to create a class for its behaviour, a template for its view, a CSS file for styling, and a test file to implement its unit tests. Of course, you need to annotate the component to indicate to Angular that the class should be treated as a component, initialize the unit tests with TestBed in the proper way... Do you think that we are going to do it by hand? No! We are going to use the power of Angular CLI to generate all that we have stated before with a single command line: 

```
ng g component countries
```

This command will generate a folder called ``countries`` inside ``apps/myapp/src/app``, and inside you will find:

* ``countries.component.ts`` - An empty typescript class called ``CountriesComponent`` properly annotated as a ``@Component`` and already linked to its template and styles.
* ``countries.component.html`` - An empty template that represents the view of the component.
* ``countries.component.css`` - To style the component. 
* ``countries.component.spec.ts``- Unit tests for the component already initialized for its first test

To use the component, it should be declared in ``app.module.ts``. Angular CLI also does this task automatically for you! Go to ``app.module.ts`` and check that the component has been automatically added to ``declarations``.

Do you want to see your brand new component in your browser? Check the ``selector``property inside the component decorator. Now, add an element with that name inside the root component, that is called ``app.component.html`` (delete first all the previously existing content in ``app.component.html`` and ``app.component.css``).

<pre><b>app.component.html</b></pre>
```diff
+ <myapp-countries></myapp-countries>
```

If you go back to the browser, you will see that it has automatically reloaded to show your new component! 

## Simulate a REST API with JSON Server

We need some data to work with. JSON Server is a simple project that helps you to setup a REST API with CRUD operations really fast. JSON Server is available as a NPM package. The installation can be done using ``npm``:

```
npm install -g json-server
```

Now, execute the following command from this project's root folder:

```
json-server tutorial/app/db.json 
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

## Adding our Services

Now that we have our ``CountriesComponent`` and our server running, let's do our first HTTP Request! We need to create a service for this purpose. Use the following command:

```
ng g service countries/countries
```

This command will generate all the files inside ``countries`` component, containing:

* ``countries.service.ts`` - An empty typescript class called ``CountriesService`` properly annotated as ``@Injectable`` to mark a class as available to be provided and injected as a dependency.
* ``countries.service.spec.ts``- Unit tests for the service already initialized for its first test.

To perform an HTTP call, we first need to import an Angular module called ``HttpClientModule``. Go to ``app.module.ts`` and add it inside ``imports``.

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

### Injecting CountriesService into CountriesComponent

Now that we have our service ready, we need to inject it and call ``getCountries`` on component initialization:

<pre><b>countries.component.ts</b></pre>
```diff
import { Component, OnInit } from '@angular/core';
+ import { CountriesService } from './countries.service';
+ import { Observable } from 'rxjs';
+ import { Country } from './country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

+ countries$: Observable<Country[]>;

- constructor() { }
+ constructor(private countriesService: CountriesService) { }

  ngOnInit() {
+   this.countries$ = this.countriesService.getCountries();
  }
}
```

Now, we will edit our template in ``countries.component.html`` to show the results:

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

## Component interaction

We want the following behaviour: when clicking on a country, we want to show its capital.

To do that, we need to introduce a second component called ``CityComponent``, and a service to communicate them: we will call it ``SharedService`` for learning purposes. ``CountriesComponent`` will use this service to emit an event with the name of the city, and ``CityComponent`` will use it to listen to that event.

Create the new component using this command:

```
ng g component city
```

Add the content of the template:

<pre><b>city.component.html</b></pre>
```diff
- <p>city works!</p>
+ <h1>city works!</h1>
```

<b>Optional:</b> If you want to display the name of the city in a beautiful way, copy into ``city.component.css`` the styles located in this file: [city.component.css](./city.component.css)

Next step is to add our new component to ``app.component.html``.

<pre><b>app.component.html</b></pre>
```diff
<myapp-countries></myapp-countries>
+ <myapp-city></myapp-city>

```

Now that we have both components created, we will create our ``SharedService`` to communicate them:

```
ng g service shared
```

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

With our service ready to send and receive values, we can edit both components to finish our app.

First we will edit ``countries.component.ts`` to add a method to send the city.

<pre><b>countries.component.ts</b></pre>
```diff
import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { Observable } from 'rxjs';
import { Country } from './country';
+ import { SharedService } from '../shared.service';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries$: Observable<Country[]>;

-  constructor(private countriesService: CountriesService) { }
+  constructor(private countriesService: CountriesService, private sharedService: SharedService) { }

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

Second, we will inject the service in ``city.component.ts``:

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

+  getCity() {
+    return this.sharedService.getCity();
+  }

}

```

Now we are going to handle the subscription automatically using the angular pipe ``async`` to receive the cities sent from ``CountriesComponent`` through the ``subject.next()``.

<pre><b>city.component.html</b></pre>
```diff
- <h1>city works!</h1>
+ <h1 *ngIf="getCity() | async as city">{{ city }}</h1>
```

Go back to your browser and click on a country. You should see its capital city on screen.

![complete-app]
