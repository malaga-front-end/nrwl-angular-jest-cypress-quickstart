import { getGreeting } from '../support/app.po';

describe('nrwl-angular-jest-cypress', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to nrwl-angular-jest-cypress!');
  });
});
