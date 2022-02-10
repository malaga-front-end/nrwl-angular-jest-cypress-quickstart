describe('myapp', () => {
  before(() => {
    // Intercept all GET request that have an URL that matches /countries and force the response to be this one
    cy.intercept('GET', '/countries', [{name: 'Spain', capital: 'Madrid'}, {name: 'France', capital: 'Paris'}]);
    cy.visit('/');
  });

  it('should display city when clicking on country', () => {
    cy.contains('Spain').click();
    cy.get('h1').contains('Madrid');
  });
});
