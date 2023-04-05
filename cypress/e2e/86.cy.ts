//Employer logs in
//Employer goes to 'My Postings'
//Employer clicks on one of their postings
//Employer clicks on 'See Candidates'
//Employer checks on potential student and selects them for interview
//Employer sees that selected student is in 'Interviews' section, is no longer in "See Candidates"
//Employer goes to 'Interviews' section and unselects student from interview
//Employer sees that unselected candidate in no longer in "Interviews", appears in "See Candidates again"

import { 
  login,
  enterValueInInputEmployerForm, 
  enterValueInTextAreaEmployerForm, 
  enterValueInMatSelectEmployerForm, 
  enterValueInMatOptionEmployerForm } 
from './utils.cy'

//Employer logs in and creates job post
describe('Employer Logs In', () => {

  it('Enter employer credentials', () => {
    login('karinasd07@hotmail.com', 'testing')
  })

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

  //Creating new job post for testing purposes
  it('Employer creates job post"', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(2)
      .click()
      cy.url().should('eq', 'http://localhost:4200/employer-form') 
      enterValueInInputEmployerForm(0, 'Cypress Tester86')
      enterValueInInputEmployerForm(1, 'New York')
      enterValueInMatSelectEmployerForm(0)
      enterValueInMatOptionEmployerForm(0)
      enterValueInInputEmployerForm(2, '30$/hour')
      enterValueInInputEmployerForm(3, '8 months')
      enterValueInInputEmployerForm(4, 'Karina Sanchez')
      enterValueInTextAreaEmployerForm(0, 'Testing with Cypress')
      enterValueInTextAreaEmployerForm(1, 'No requirements')
      enterValueInInputEmployerForm(5, '01/05/2023')
      cy.get('mat-form-field') 
        .eq(9)
        .find('mat-select')
        .eq(0)
        .click({ force: true })         
    enterValueInMatOptionEmployerForm(1)
      cy.get('mat-form-field') 
        .eq(10)
        .find('mat-select')
        .eq(0)
        .click({ force: true }) 
    enterValueInMatOptionEmployerForm(1)
    enterValueInInputEmployerForm(6, 'John')
    enterValueInInputEmployerForm(7, 'Smith')
    enterValueInInputEmployerForm(8, 'www.websiteName.com')
    enterValueInInputEmployerForm(9, 'Montreal')
    enterValueInInputEmployerForm(10, 'Quebec')
    enterValueInInputEmployerForm(11, 'HHH HH6')
    const p = './cypress/fixtures/Images/2023-03-19_13h43_24.jpg'
    cy.get('input')
        .eq(12)
        .selectFile(p, {force:true})
    cy.get('app-employer-form')
        .find('button')
        .eq(1)
        .click( { force: true} ) 
    cy.get('.mat-mdc-snack-bar-label')
    .should('exist')  
   
  })
}) //end of 'Employer Logs In' 

//Student logs in and applies to job post
describe('Student Logs In', () => {

  it('Enter student credentials', () => {
    login('karinasd007@gmail.com', 'testing123')
  })

  it('Student clicks on job post "Cypress Tester86" and applies', () => {
    login('karinasd07@gmail.com', 'testing123')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('div.cards')
      .contains('Cypress Tester86')
      .click()
    cy.contains('Apply').click()
  })

}) //end of 'Student Logs In'

//Employer logs in, selects and unselects student from interview
describe('Employer Logs In Again', () => {

  it('Employer clicks on "My Postings"', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Cypress Tester86')
        .should('exist') 

  })

  it('Employer clicks on "Cypress Tester86" job post', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Cypress Tester86')
        .click()
  })

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
        .contains('Cypress Tester86')
        .click()
      cy.contains('See Candidates').click()
  })

  it('Employer selects candidate for interview', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Cypress Tester86')
        .click()
      cy.contains('See Candidates').click()
      cy.get('div.candidate-cards').contains('Kari Duran')
      cy.contains('Select for Interview').click()
  })

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
      cy.wait(3000) //for page to load
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
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Cypress Tester86')
        .click()
      cy.contains('See Candidates').click()
      cy.get('div.candidate-cards')
        .contains('Kari Duran')
        .should('not.exist')
  })

  it('Employer unselects candidate for interview in "Interviews"', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/employer-interviews')
      cy.get('div.employer-int-cards').contains('Kari Duran')
      cy.contains('Unselect from Interview').click()
  })

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
      cy.wait(3000) //for page to load
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
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/my-postings')
      cy.get('div.cardz')
        .contains('Cypress Tester86')
        .click()
      cy.contains('See Candidates').click()
      cy.get('div.candidate-cards')
        .contains('Kari Duran')
        .should('exist')
  })


}) //end of 'Employer Logs In Again'

