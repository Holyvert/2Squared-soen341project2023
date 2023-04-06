// User logs in.
// User clicks on Profile section in nav bar.
// User gets redirected to User Profile Page.
// User sees there information.
// Do for employer and student.

import { login } from './utils.cy';
describe('Student Logs In', () => {
  it('Enters Credentials of a Student', () => {
    login('am.czuboka@gmail.com', 'soen341');
  });

  it('Redirects to Landing Page, Clicks on "Profile" and checks if it is their profile', () => {
    login('am.czuboka@gmail.com', 'soen341');
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(4)
      .contains('Profile')
      .click({ force: true });
    cy.url().should('eq', 'http://localhost:4200/profile');
    cy.get('.col-md-4')
      .find('.information')
      .eq(0)
      .should('contain', 'Ann-Marie');
    cy.get('.col-md-4').find('.information').eq(1).should('contain', 'Czuboka');
    cy.get('.col-md-4')
      .find('.information')
      .eq(2)
      .should('contain', 'Software Engineering');
  });

  describe('Employer Logs In', () => {
    it('Enters Credentials of an Employer', () => {
      login('isaczu15@gmail.com', 'soen341');
    });

    it('Redirects to Landing Page, Clicks on "Profile" and checks if it is their profile', () => {
      login('isaczu15@gmail.com', 'soen341');
      cy.url().should('eq', 'http://localhost:4200/');
      cy.get('nav')
        .find('#myDIV')
        .find('ul')
        .find('li')
        .eq(4)
        .contains('Profile')
        .click({ force: true });
      cy.url().should('eq', 'http://localhost:4200/profile');
      cy.get('.col-md-4')
        .find('.information')
        .eq(0)
        .should('contain', 'Isabelle');
      cy.get('.col-md-4')
        .find('.information')
        .eq(1)
        .should('contain', 'Czuboka');
      cy.get('.col-md-4')
        .find('.information')
        .eq(2)
        .should('contain', 'VuWall');
    });
  });
});
