//Employer logs in
//Employer goes to 'My Postings'
//Employer clicks on one of their postings
//Employer clicks on 'See candidates'
//Employer checks on potential student and selects them for interview
//Check to see if the student(s) have that specific posting in their attribute interview in database

import { login } from './utils.cy'
describe('Employer Logs In', () => {

  //Entering employer credentials
  it('Enter employer credentials', () => {
    login('karinasd07@hotmail.com', 'testing')
  })

  //Employer is redirected to landing page after logging in
  it('Employer logs in, gets redirected to Landing Page and verfies they are employer', () => {
        
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .contains('My Postings')
      cy.get('app-landing').should('exist')
  })

  //Employer clicks on 'My Postings'
  it('Employer clicks on "My Postings"', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.url().should('eq', 'http://localhost:4200/my-postings') 

  })

  //Employer clicks on one of their postings in 'My Postings'
  it('Employer clicks on one of their postings', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz').contains('Project Management Intern').click()
  })

  //Employer clicks on 'See Candidates'
  it('Employer clicks on "See Candidates" and is redirected to new page', () =>{
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Project Management Intern')
        .click()
      cy.contains('See Candidates').click()
  })

  //Employer selects candidate to interview
  it('Employer selects candidate', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz').contains('Project Management Intern').click()
      cy.contains('See Candidates').click()
      cy.get('div.candidate-cards').contains('Kari Duran')
      cy.contains('Select for Interview').click()
  })

  it('Employer sees candidate in "Interviews" section', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.url().should('eq', 'http://localhost:4200/employer-interviews')
  })


}) 