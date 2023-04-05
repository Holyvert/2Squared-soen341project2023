//Employer logs in
//Employer goes to 'My Postings'
//Employer clicks on one of their postings
//Employer clicks on 'See Candidates'
//Employer checks on potential student and selects them for interview
//Employer sees that selected student is in 'Interviews' section, is no longer in "See Candidates"
//Employer goes to 'Interviews' section and unselects student from interview
//Employer sees that unselected candidate in no longer in "Interviews", appears in "See Candidates again"

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
      cy.wait(1000) //for page to load
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
      cy.wait(1000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Project Management Intern')
        .click()
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
  it('Employer selects candidate for interview', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.wait(1000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Project Management Intern')
        .click()
      cy.contains('See Candidates').click()
      cy.get('div.candidate-cards').contains('Kari Duran')
      cy.contains('Select for Interview').click()
  })

  //Employer sees candidate in "Interviews" section and is no longer in "See Candidates"
  it('Employer sees candidate in "Interviews" section and is no longer in candidates page', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/')
    //Employer goes to interviews section 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(1000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/employer-interviews')
      cy.get('div.employer-int-cards')
        .contains('Kari Duran')
        .should('exist')
    //Employer sees candidates for specific post
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.wait(1000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Project Management Intern')
        .click()
      cy.contains('See Candidates').click()
      cy.get('div.candidate-cards')
        .contains('Kari Duran')
        .should('not.exist')
  })

  //Employer unselects candidate from "Interviews" section
  it('Employer unselects candidate for interview in "Interviews"', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(1000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/employer-interviews')
      cy.get('div.employer-int-cards').contains('Kari Duran')
      cy.contains('Unselect from Interview').click()
  })

  //Employer no longer sees unselected candidate in "Interviews", appears once again in "See Candidates"
  it('Student unselected for interview is no longer in "Interviews", appears as candidate again', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/')
    //Goes to interviews page 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(1000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/employer-interviews')
      cy.get('div.employer-int-cards')
        .contains('Kari Duran')
        .should('not.exist')
    //Goes to candidate page
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.wait(1000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Project Management Intern')
        .click()
      cy.contains('See Candidates').click()
      cy.get('div.candidate-cards')
        .contains('Kari Duran')
        .should('exist')
  })



}) 