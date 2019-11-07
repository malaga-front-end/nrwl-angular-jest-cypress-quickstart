# Diff 5: E2E Tests with Cypress

<pre><b>app.spec.ts</b></pre>

```typescript
describe('myapp', () => {
  before(() => {
    cy.server();           // enable response stubbing
    cy.route({
      method: 'GET',      // Route all GET requests
      url: '/countries',    // that have a URL that matches '/countries'
      response: [{name: 'Spain', capital: 'Madrid'}, {name: 'France', capital: 'Paris'}]        // and force the response to be this one
    });
    cy.visit('/');
  });

  it('should display city when clicking on country', () => {
    cy.contains('Spain').click();
    cy.get('h1').contains('Madrid');
  });
});
```
