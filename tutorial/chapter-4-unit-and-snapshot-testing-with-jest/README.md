# Chapter 3: Unit and snapshot testing with Jest
Now that we have the app completed we can start writing unit tests with Jest.

Jest is a Javascript testing framework focused on simplicity. Some of the benefits of using Jest are:

* Easy mocking. In just one line you can mock an entire service.
* Allows parallel execution. Jest runs your tests in parallel making it faster than Jasmine.
* Easy UI testing. With Jest you can create snapshots of your rendered HTML. You don't need to navigate through the DOM anymore!
* Does not need specific configuration. You can start using Jest after installing it.

## Unit Testing our first component: CountriesComponent
As we used Angular CLI to create our component we have an initial set up to start covering our component with more tests.

<pre><b>countries.component.spec.ts</b></pre>
```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesComponent } from './countries.component';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

We need to test this component in isolation, what we know is that we have a list of elements that you can click to send data somewhere else. We need two different tests:
1. On init we call a service to retrieve a list of countries.
2. When we click a country we send its capital.

So let's start testing!

Go to ``countries.component.spec.ts``.

If you check `CountriesComponent` you will see that we are injecting two services (``CountriesService`` and ``SharedService``). We need to add both services to the TestBed as providers.

As we want to test our component in isolation we need to mock the injected services. Jest makes mocking a super easy thing, we just need to use ``jest.mock(PATH_TO_YOUR_SERVICE)``. Now every time that we call a method from this services we will not use its real implementation.

Now we are going to get our services from the testing context and store them in a variable so we can use them.

<pre><b>countries.component.spec.ts</b></pre>
```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesComponent } from './countries.component';
import { CountriesService } from './countries.service';
import { SharedService } from '../shared.service';

+ jest.mock('./countries.service');
+ jest.mock('../shared.service');

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
+  let countriesService: CountriesService;
+  let sharedService: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesComponent ],
+      providers: [ CountriesService, SharedService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
+    countriesService = TestBed.get(CountriesService);
+    sharedService = TestBed.get(SharedService);

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

To run our tests we need to mock what ``CountriesService.getCountries()`` returns. We are going to use ``Jest.spyOn`` method to do that. We are going to return two different countries in our mocked return value.

Now we can add the test to check that ``CountriesService.getCountries()`` has been called.

<pre><b>countries.component.spec.ts</b></pre>
```diff
...

  beforeEach(() => {
    countriesService = TestBed.get(CountriesService);
    sharedService = TestBed.get(SharedService);

+    jest.spyOn(countriesService, 'getCountries').mockReturnValue(of([
+      { name: 'Spain', capital: 'Madrid' },
+      { name: 'France', capital: 'Paris'}
+    ]));

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

+  it('should call CountriesService.getCountries()', () => {
+    expect(countriesService.getCountries).toHaveBeenCalled();
+  });
});

```

Now we need to test that when we click on a country we send its capital city. We need to spy ``SharedService.sendCity()`` and check that it has been called with the correct parameter.

<pre><b>countries.component.spec.ts</b></pre>
```diff

...

+ import { By } from '@angular/platform-browser';

...

describe('CountriesComponent', () => {

...

  beforeEach(() => {
    countriesService = TestBed.get(CountriesService);
    sharedService = TestBed.get(SharedService);

    jest.spyOn(countriesService, 'getCountries').mockReturnValue(of([
      { name: 'Spain', capital: 'Madrid' },
      { name: 'France', capital: 'Paris'}
    ]));
    
+    jest.spyOn(sharedService, 'sendCity');

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  ...
  
+  it('should send capital city after clicking on a country', () => {
+    const firstElement = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;
+    firstElement.click();
+    expect(sharedService.sendCity).toHaveBeenCalledWith('Madrid');
+  });
});

```

## Snapshot Testing our first component: CountriesComponent

Snapshot tests are a very useful tool to make sure your UI does not change unexpectedly. 

A typical snapshot test case renders a UI component, takes a snapshot and then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshot do not match. Here we have two scenarios:
* The change is unexpected.
* The reference snapshot needs to be updated to the new version of the UI component.

Create a snapshot test is very simple.

<pre><b>countries.component.spec.ts</b></pre>
```diff
...

describe('CountriesComponent', () => {

...

+  it('should render a list of countries', () => {
+    expect(fixture).toMatchSnapshot();
+  });
});

```

After running the tests a folder named ``__snapshots__`` will be automatically created. Inside you will see a file ``countries.component.speec.ts.snap`` containing the rendered HTML for your test.

You need to review this file and check that everything is correct.

<pre><b>countries.component.speec.ts.snap</b></pre>
```diff
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`CountriesComponent should render a list of countries 1`] = `
<myapp-countries
  countries$={[Function Observable]}
  countriesService={[Function CountriesService]}
  sharedService={[Function SharedService]}
>
  <ul>
    
    <li>
      Spain
    </li>
    <li>
      France
    </li>
  </ul>
</myapp-countries>
`;


```

Next time we run the test jest will compare the new generated HTML against the one in this file, if both matches the test will pass, if not, the test will fail.

If we introduce a change we need to update our stored snapshot, to do that we just need to run our tests with the flag ``-u`` to tell jest to update the snapshot file.

```
ng test -u
```

## Unit Testing our service: CountriesService

Go to ``countries.service.spec.ts``.

We are not going to use Angular's TestBed because it is not needed to test a service. Additionally it reduces complexity and increases speed when running the tests. 

We will initialize the service creating a new instance of it. First thing we need to do in our case is to mock ``HttpClient`` using jest. After that, we can spy on the method as we did before and check that we call ``HttpClient.get()`` method.

<pre><b>countries.service.spec.ts</b></pre>
```diff
import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';
+ import { HttpClient } from '@angular/common/http';

+ jest.mock('@angular/common/http');

describe('CountriesService', () => {
+  let httpClient: HttpClient;
+  let countriesService: CountriesService;

-  beforeEach(() => TestBed.configureTestingModule({}));
+  beforeEach(() => {
+    httpClient = new HttpClient({} as any);
+    countriesService = new CountriesService(httpClient);

+    jest.spyOn(httpClient, 'get');
  });
  
  it('should be created', () => {
-   const service: CountriesService = TestBed.get(CountriesService);
_   expect(service).toBeTruthy();
+    expect(countriesService).toBeTruthy();
  });

+ it('should retrieve a list of countries with its capitals', () => {
+    countriesService.getCountries();
+
+    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/countries');
+  });
});

```

Testing ``CityComponent`` and ``SharedService`` is similar, you will find how to do it in [city.component.spec.ts](../../apps/myapp/src/app/city/city.component.spec.ts) and [shared.service.spec.ts](../../apps/myapp/src/app/shared.service.spec.ts).

Reaching this point, you are in a good position to continue learning Jest and making your life easier when developing Unit and Snapshot tests for your app :).

After unit testing your application, you can now check that all together works developing your first e2e test with Cypress!

Continue to [Chapter 5: E2E Testing with Cypress](../chapter-5-e2e-testing-with-cypress).

