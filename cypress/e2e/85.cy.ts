// User Acceptance Flow:

// Student logs in.
// Student clicked on one of the posting on landing page
// Student clicks "apply".
// Student goes to landing page
// Student clicks on Applied to section
// Student now sees the posting they have applied to
import {
  login,
  enterValueInInputEmployerForm,
  enterValueInTextAreaEmployerForm,
  enterValueInMatSelectEmployerForm,
  enterValueInMatOptionEmployerForm,
} from './utils.cy';
describe('Create job post to favorite', () => {
  it('Employer fills up form with Image"', () => {
    login('isaczu15@gmail.com', 'soen341');
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('nav').find('#myDIV').find('ul').find('li').eq(2).click();
    cy.url().should('eq', 'http://localhost:4200/employer-form');
    enterValueInInputEmployerForm(0, 'Cypress Tester85');
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
    cy.wait(4000).get('.mat-mdc-snack-bar-label').should('exist');
  });
});
describe('Student favorites job post', () => {
  it("Student Search For Keyword 'Cypress Tester85' in Search Bar", () => {
    cy.wait(4000);
    login('am.czuboka@gmail.com', 'soen341');
    cy.get('app-landing')
      .find('app-job-post')
      .find('app-search')
      .find('mat-label')
      .should('contain', 'Search by position, title or company');
    cy.wait(4000).get('app-search').click().type('Cypress Tester85');
    cy.get('.top-card > p')
      .should('contain', 'Cypress Tester85')
      .click()
      .log('Cypress tester 85 found');

    cy.contains('Add To Favorites').wait(1500).click();
    cy.get('.mat-mdc-snack-bar-label')
      .contains('Post has been added to Favorites')
      .wait(1500)
      .should('exist')
      .log('Snack bar was found and eaten');
  });

  it("Student Navigates to favorites and unfavorites 'Cypress Tester85'", () => {
    cy.wait(4000);
    login('am.czuboka@gmail.com', 'soen341');
    cy.get(':nth-child(4) > .nav-link')
      .contains('Favorites')
      .click()
      .wait(4000);
    cy.contains('Cypress Tester85').click();
    cy.contains('UnFavorite').click();
    cy.get('.mat-mdc-snack-bar-label')
      .contains('Post has been removed from Favorites')
      .wait(1500)
      .should('exist')
      .log('Snack bar was found and eaten');
  });
});

describe('Clean up test by deleting post', () => {
  it("Employer Search for KeyWord 'Cypress Tester85' in Search Bar then delete's it to clean test", () => {
    login('isaczu15@gmail.com', 'soen341');
    cy.get('app-landing')
      .find('app-job-post')
      .find('app-search')
      .find('mat-label')
      .should('contain', 'Search by position, title or company');
    cy.get('app-search').click().type('Cypress Tester85');
    cy.get('.top-card > p').should('contain', 'Cypress Tester85');
    cy.get('.top-card > p').click();

    cy.wait(4000).contains('Delete').click();
    cy.get('.mat-mdc-snack-bar-label')
      .contains('Posting Cypress Tester85')
      .should('exist')
      .log('Snack bar was found and eaten');
  });
});
