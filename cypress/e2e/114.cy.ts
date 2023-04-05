// User Acceptance Flow:

// User logs in (does not matter which type)
// User click on search bar
// User puts in a keyword such as position, title or company
// Checks to see that the available posts correspond to search keyword
import {
  login,
  enterValueInInputEmployerForm,
  enterValueInTextAreaEmployerForm,
  enterValueInMatSelectEmployerForm,
  enterValueInMatOptionEmployerForm,
} from './utils.cy';
describe('Search for job posting using search bar', () => {
  it('Create a new posting to execute on test', () => {
    login('isaczu15@gmail.com', 'soen341');
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('nav').find('#myDIV').find('ul').find('li').eq(2).click();
    cy.url().should('eq', 'http://localhost:4200/employer-form');
  });

  it('Employer fills up form with Image"', () => {
    login('isaczu15@gmail.com', 'soen341');
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('nav').find('#myDIV').find('ul').find('li').eq(2).click();
    cy.url().should('eq', 'http://localhost:4200/employer-form');
    enterValueInInputEmployerForm(0, 'Cypress Tester114');
    enterValueInInputEmployerForm(1, 'New York');
    enterValueInMatSelectEmployerForm(0);
    enterValueInMatOptionEmployerForm(0);
    enterValueInInputEmployerForm(2, '30$/hour');
    enterValueInInputEmployerForm(3, '8 months');
    enterValueInInputEmployerForm(4, 'Ann-Marie Czuboka');
    enterValueInTextAreaEmployerForm(0, 'Testing with Cypress');
    enterValueInTextAreaEmployerForm(1, 'No requirements');
    enterValueInInputEmployerForm(5, '01/05/2023');
    cy.get('mat-form-field')
      .eq(9)
      .find('mat-select')
      .eq(0)
      .click({ force: true });
    enterValueInMatOptionEmployerForm(1);
    cy.get('mat-form-field')
      .eq(10)
      .find('mat-select')
      .eq(0)
      .click({ force: true });
    enterValueInMatOptionEmployerForm(1);
    enterValueInInputEmployerForm(6, 'Isabelle');
    enterValueInInputEmployerForm(7, 'Czuboka');
    enterValueInInputEmployerForm(8, 'www.twins.com');
    enterValueInInputEmployerForm(9, 'Montreal');
    enterValueInInputEmployerForm(10, 'Quebec');
    enterValueInInputEmployerForm(11, 'H9J 3B4');
    const p = './cypress/fixtures/Images/2023-03-19_13h43_24.jpg';
    cy.get('input').eq(12).selectFile(p, { force: true });
    cy.get('app-employer-form').find('button').eq(1).click({ force: true });
    cy.get('.mat-mdc-snack-bar-label').should('exist');
  });
  it("Student Search For Keyword 'Cypress Tester114' in Search Bar", () => {
    cy.wait(4000);
    login('am.czuboka@gmail.com', 'soen341');
    cy.get('app-landing')
      .find('app-job-post')
      .find('app-search')
      .find('mat-label')
      .should('contain', 'Search by position, title or company');
    cy.wait(4000).get('app-search').click().type('Cypress Tester114');
    cy.get('.top-card > p')
      .should('contain', 'Cypress Tester114')
      .log('Cypress tester 114 found');
  });
  it("Employer Search for KeyWord 'Cypress Tester114' in Search Bar then delete's it to clean test", () => {
    login('isaczu15@gmail.com', 'soen341');
    cy.get('app-landing')
      .find('app-job-post')
      .find('app-search')
      .find('mat-label')
      .should('contain', 'Search by position, title or company');
    cy.get('app-search').click().type('Cypress Tester114');
    cy.get('.top-card > p').should('contain', 'Cypress Tester114');
    cy.get('.top-card > p').click();

    cy.wait(4000).contains('Delete').click();
    cy.get('.mat-mdc-snack-bar-label')
      .contains('Posting Cypress Tester114')
      .should('exist')
      .log('Snack bar was found and eaten');
  });
});
