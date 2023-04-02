// Employer logs in.
// Employer clicks on Profile section in nav bar.
// Employer gets redirected to User Profile Page.
// Employer clicks "Edit".
// Employer can modify the different sections of their profile.
// Employer clicks "Save".
// Employer now sees their profile with the edited information.


import { login } from './utils.cy'
describe('Student Logs In', () => {
    it('Enters Credentials of an Employer', () => {
      login('isaczu15@gmail.com', 'soen341')
      })

    it('Redirects to Landing Page, Clicks on "Profile" and checks if it is their profile', () => {
        login('isaczu15@gmail.com', 'soen341')
    cy.url().should('eq', 'http://localhost:4200/') 
      cy.get('nav')
        .find('#myDIV')
        .find('ul')
        .find('li')
        .eq(4)
        .contains('Profile')
        .click( {force: true} )
      cy.url().should('eq', 'http://localhost:4200/profile') 
      cy.get('.col-md-4')
        .find('.information')
        .eq(0)
        .should('contain', 'Isabelle')
      cy.get('.col-md-4')
        .find('.information')
        .eq(1)
        .should('contain', 'Czuboka')
      cy.get('.col-md-4')
        .find('.information')
        .eq(2)
        .should('contain', 'VuWall')
    })

    it('User Edits Info and Sees New info after Save action', () => {
      login('isaczu15@gmail.com', 'soen341')
      cy.url().should('eq', 'http://localhost:4200/') 
      cy.get('nav')
        .find('#myDIV')
        .find('ul')
        .find('li')
        .eq(4)
        .contains('Profile')
        .click( {force: true} )
      cy.url().should('eq', 'http://localhost:4200/profile') 
      cy.get('app-user-profile')
        .find('section')
        .find('button')
        .click( {force: true})
      cy.get('input')
        .eq(0)
        .clear()
        .click( {force: true})
        .type('Isabelle')
      cy.get('input')
        .eq(1)
        .clear()
        .click( {force: true})
        .type('Czuboka')
      cy.get('input')
        .eq(2)
        .clear()
        .click( {force: true})
        .type('VuWall')
      cy.get('.col-md-8')
        .find('input')
        .clear()
        .click( {force: true})
        .type('French')
      cy.get('app-user-profile')
        .find('section')
        .find('button')
        .eq(0)
        .click( {force: true})
      cy.get('.col-md-8')
        .find('.information')
        .eq(1)
        .should('contain', 'French')
      })
  })

  