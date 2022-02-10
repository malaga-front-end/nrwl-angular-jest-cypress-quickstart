[e2e]: assets/e2e.png
[stub]: assets/stub.png
[time-travel]: assets/time-travel.png

# Chapter 5: E2E testing with Cypress

Now that we have unit tested our components separately with Jest, it is the moment to do integration tests with Cypress. Cypress is a framework that makes the following tasks amazingly simple:

* Setting up tests: Write your first pass test in 60 seconds. There are no servers, drivers, or any other dependencies to install or configure.
* Writing tests: Tests written in Cypress are easy to read and understand.
* Running tests: Cypress runs as fast as your browser can render content. You can watch tests run in real time as you develop your applications.
* Debugging: Readable error messages help you to debug quickly. You also have access to all developer tools you know and love.

## Writing your first E2E test

Now, let's tell to cypress what do we want to do with the app. We should display the capital city of the country that we click. We will click a list item (``li``), and after that, there will be a ``h1`` that will show the name of the city. Let's write that!

```diff
describe('app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

+  it('should display city when clicking on country', () => {
+    cy.get('li').eq(0).click();
+    cy.get('h1').contains('Kabul');
+  });
});

```

As you can see, we use ``get(selector)`` to get any element in the app. Then, if we have more than one element, we can use ``eq`` to get the element that we exactly want. We can do multiple actions on the elements. In this case, we want to ``click`` on that element. After that, we will check if our ``h1`` contains the description that we want. Simple, and easy to read :).

Now, we need to execute our e2e tests in watch mode. 

```
ng e2e myapp-e2e --watch
```

![e2e]

Click on ``app.spec.ts`` to execute our test. You will see a very friendly step by step mode with time travel. You will be able to go back and forth to check what happened in each step! In the screenshot below you can see that when we hover ``-CLICK``, the app is showing where the click was done in the browser.

![time-travel]

You can also get the DOM element containing text with ``contains``. For example, you can tell Cypress to get the element containing "Spain", and click on it. If the element is not visible on screen, it will automatically scroll the browser to find it. Amazing, huh?

```diff
describe('app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display city when clicking on country', () => {
-    cy.get('li').eq(0).click();
-    cy.get('h1').contains('Kabul');
+    cy.contains('Spain').click();
+    cy.get('h1').contains('Madrid');
  });
});

```

## Stubbing a response

With the code that we have developed before, we are calling the real endpoint. Imagine that your E2E is running in a pipeline, and you want it passing even if the real endpoint is not available. Stubbing a response is very easy:

```diff
describe('app', () => {
  beforeEach(() => {
+    // Intercept all GET request that have an URL that matches /countries and force the response to be this one
+   cy.intercept('GET', '/countries', [{name: 'Spain', capital: 'Madrid'}, {name: 'France', capital: 'Paris'}]);

    cy.visit('/');
  });

  it('should display city when clicking on country', () => {
    cy.contains('Spain').click();
    cy.get('h1').contains('Madrid');
  });
});
```

You just need to call ``cy.intercept()`` and provide some parameters; the HTTP ``method``, the ``url``, and the response that you want to return in that case.

If you go to the Cypress Test Runner, and you expand the ROUTES section, you can check that the stubbed responses have a flag that say "Stubbed: yes".

![stub]

Reaching this point, you are in a good position to continue learning Cypress and making your life easier when developing E2E tests for your app :).
