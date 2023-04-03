// Employer logs in
// Employer goes to "My Postings"
// Employer clicks on one of his posts
// Employer clicks on edit
// Employer edits one or more fields in the posting
// Checks to see that that posting is changed accurately in database

import {
  login,
  enterValueInInputEmployerForm,
  enterValueInTextAreaEmployerForm,
  enterValueInMatSelectEmployerForm,
  enterValueInMatOptionEmployerForm,
} from './utils.cy';
describe('Employer Logs In', () => {
  // employer edits one of their posting for purpose of e2e test on one object
  it('Redirects to Landing Page, checks if is Employer', () => {
    login('isaczu15@gmail.com', 'soen341');
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(2)
      .contains('Create New Posting');
    cy.get('app-landing').should('exist');
  });

  it('Employer clicks on "Create New Posting"', () => {
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
    enterValueInInputEmployerForm(0, 'Cypress Tester88');
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

  it('Employer navigates back to home, redirect to "my postings" ands edits the post', () => {
    cy.visit('http://localhost:4200/');
    login('isaczu15@gmail.com', 'soen341');
    cy.url().should('not.eq', 'http://localhost:4200/');
    cy.get('nav').find('#myDIV').find('ul').find('li').eq(1).click();
    // Added this to make sure the page is loaded
    cy.wait(1000);
    cy.url().should('eq', 'http://localhost:4200/my-postings');
    cy.get('div.cardz').contains('Cypress Tester88').click({ force: true }); //this works
    cy.contains('Edit').click({ force: true });
    cy.get('.col-md-12').eq(1).find('button').click({ force: true });
    enterValueInInputEmployerForm(0, 'Edit Tester88');
    enterValueInInputEmployerForm(1, 'Toronto');
    enterValueInMatSelectEmployerForm(0);
    enterValueInMatOptionEmployerForm(0);
    enterValueInInputEmployerForm(2, '35$/hour');
    enterValueInInputEmployerForm(3, '4 months');
    enterValueInInputEmployerForm(4, 'Isabelle Czuboka');
    enterValueInTextAreaEmployerForm(0, 'Testing with Cypress');
    enterValueInTextAreaEmployerForm(1, 'No requirements');
    enterValueInInputEmployerForm(5, '01/05/2023');
    cy.get('mat-form-field')
      .eq(9)
      .find('mat-select')
      .eq(0)
      .click({ force: true });
    enterValueInMatOptionEmployerForm(0);
    cy.get('mat-form-field')
      .eq(10)
      .find('mat-select')
      .eq(0)
      .click({ force: true });
    enterValueInMatOptionEmployerForm(1);
    enterValueInInputEmployerForm(6, 'Anna');
    enterValueInInputEmployerForm(7, 'Czuboka');
    enterValueInInputEmployerForm(8, 'www.twins2.com');
    enterValueInInputEmployerForm(9, 'Montreal');
    enterValueInInputEmployerForm(10, 'Quebec');
    enterValueInInputEmployerForm(11, 'H9J 3B9');
    const p = './cypress/fixtures/Images/2023-03-19_13h43_24.jpg';
    cy.get('input').eq(12).selectFile(p, { force: true });
    cy.contains('Save').click();
    cy.get('.mat-mdc-snack-bar-label').should('exist');
  });
  it('Redirects to "my postings" and checks if updated post is there and deletes', () => {
    cy.visit('http://localhost:4200/');
    login('isaczu15@gmail.com', 'soen341');
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('nav').find('#myDIV').find('ul').find('li').eq(1).click();
    // Added this to make sure the page is loaded
    cy.wait(1000);
    cy.url().should('eq', 'http://localhost:4200/my-postings');
    cy.get('div.cardz').contains('Edit Tester88').click(); //this works
    cy.contains('Delete').click();
    cy.get('.mat-mdc-snack-bar-label')
      .contains('Posting Edit Tester88')
      .should('exist');
  });
});
