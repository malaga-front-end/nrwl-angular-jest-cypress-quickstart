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
