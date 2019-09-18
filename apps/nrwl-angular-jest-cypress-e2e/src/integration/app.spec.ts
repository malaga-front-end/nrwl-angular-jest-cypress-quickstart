import { getCountries, getCity } from '../support/app.po';

describe('app', () => {
  beforeEach(() => {
    cy.server()           // enable response stubbing
    cy.route({
      method: 'GET',      // Route all GET requests
      url: '/countries',    // that have a URL that matches '/users/*'
      response: [{country: 'Spain', city: 'Madrid'}]        // and force the response to be: []
    })
    cy.visit('/')
  });

  it('should display city when clicking on country', () => {
    getCountries().eq(0).click();
    getCity().contains('Madrid');
  });
});
