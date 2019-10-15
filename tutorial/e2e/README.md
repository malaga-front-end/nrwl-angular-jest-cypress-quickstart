## E2E testing with Cypress

Now that we have unit tested our components separately with Jest, it is the moment to do integration tests with Cypress. Cypress is a framework that makes the following tasks amazingly simple:

* Setting up tests: Write your first pass test in 60 seconds. There are no servers, drivers, or any other dependencies to install or configure.
* Writing tests: Tests written in Cypress are easy to read and understand.
* Running tests: Cypress runs as fast as your browser can render content. You can watch tests run in real time as you develop your applications.
* Debugging: Readable error messages help you to debug quickly. You also have access to all developer tools you know and love.

Now, following TDD, let's tell to cypress what do we want to do with the app:

```javascript
describe('app', () => {
  it('should display city when clicking on country', () => {
    
  });
});
```

Easy huh? Now, let's write the tests that we want to pass in our future app. Following the description that we have given before, we will click in a list item (``li``), and after that, there will be a ``h1`` that will show the name of the city. Let's write that!

```javascript
describe('app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display city when clicking on country', () => {
    cy.get('li').eq(0).click();
    cy.get('h1').contains('Madrid');
  });
});

```

As you can see, we use ``get(selector)`` to get any element in the app. Then, if we have more than one element, we can use ``eq`` to get the element that we exactly want. We can do multiple actions on the elements. In this case, we want to ``click`` on that element. After that, we will check if our ``h1`` contains the description that we want. Simple, and easy to read :).

### Mocking a response

With the code that we have developed before, we will be calling the real endpoint. Imagine that your E2E is running in a pipeline, and you want it working even if the realpoint is not available. Do you want to know how easy is to mock the response?


```javascript
describe('app', () => {
  beforeEach(() => {
    cy.server();           // enable response stubbing
    cy.route({
      method: 'GET',      // Route all GET requests
      url: '/countries',    // that have a URL that matches '/countries/*'
      response: [{country: 'Spain', city: 'Madrid'}]        // and force the response to be this one
    });
    cy.visit('/');
  });

  it('should display city when clicking on country', () => {
    cy.get('li').eq(0).click();
    cy.get('h1').contains('Madrid');
  });
});
```

First, you need to enable response stubbing with ``cy.server()``. After that, you need to call ``cy.route()``. You need to provide some parameters; the HTTP ``method`` that you want to mock, the ``url``, and the response that you want to force in that case. With this, you will always have your test ready to be used in your pipelines :).