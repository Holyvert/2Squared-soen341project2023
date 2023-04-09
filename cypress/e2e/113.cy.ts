//Student logs in
//Student clicks on one posting
//Student presses "Add To Favorites" button
//Check to see if posting is in 'Favorites' section
//Student clicks on posting in 'Favorites' section
//Student removes posting from 'Favorites' section
//Student checks to see that posting is no longer in 'Favorites' section

import { 
  login, 
  enterValueInInputEmployerForm, 
  enterValueInTextAreaEmployerForm, 
  enterValueInMatSelectEmployerForm, 
  enterValueInMatOptionEmployerForm 
} from './utils.cy'

describe('Employer Logs In', () => {

  it('Enters Credentials of an Employer', () => {
    login('karinasd07@hotmail.com', 'testing')
  }) 

  //For Testing purposes
  it('Employer creates job post "Cypress Tester113"', () => {
    login('karinasd07@hotmail.com', 'testing')
    cy.wait(4000)
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(2)
      .click()
      cy.wait(3000)
      cy.url().should('eq', 'http://localhost:4200/employer-form') 
      enterValueInInputEmployerForm(0, 'Cypress Tester113')
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
    enterValueInMatOptionEmployerForm(0)
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
      .click({ force: true });
    cy.wait(4000)
      .get('.mat-mdc-snack-bar-label')
      .should('exist');
  })
})

describe('Student Logs In', () => {

  it('Enters Credentials of a Student', () => {
    login('karinasd007@gmail.com', 'testing123')
  }) 

  it('Student clicks on job post "Cypress Tester113" and add it to favorites', () => {
    login('karinasd007@gmail.com', 'testing123')
    cy.wait(4000) 
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.wait(2000)
    cy.get('div.cardz')
      .contains('Cypress Tester113')
      .click()
    cy.contains('Add To Favorites').click()
    cy.wait(2000)
  })

  it('Student clicks on "Favorites" and sees "Cypress Tester 113"', () => {
    login('karinasd007@gmail.com', 'testing123')
    cy.wait(4000) 
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(4000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/favorites')
      cy.get('div.cardz')
        .contains('Cypress Tester113')
        .should('exist') 
  })

  it('Student clicks on "Cypress Tester113" job post', () => {
    login('karinasd007@gmail.com', 'testing123')
    cy.wait(4000) 
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/favorites')
      cy.get('div.cardz')
        .contains('Cypress Tester113')
        .click()
  })

  it('Student removes "Cypress Tester113" from "Favorites" section', () =>{
    login('karinasd007@gmail.com', 'testing123')
    cy.wait(4000) 
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/favorites')
      cy.get('div.cardz')
        .contains('Cypress Tester113')
        .click()
      cy.wait(3000) //for page to load
      cy.contains('UnFavorite').click()
  })

  it('Student clicks on "Favorites" and sees "Cypress Tester 113" is no longer there', () => {
    login('karinasd007@gmail.com', 'testing123')
    cy.wait(4000) 
    cy.url().should('eq', 'http://localhost:4200/') 
    cy.get('nav')
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(3)
      .click()
      cy.wait(3000) //for page to load
      cy.url().should('eq', 'http://localhost:4200/favorites')
      cy.get('div.cardz')
        .contains('Cypress Tester113')
        .should('not.exist') 
  })

})

describe('Employer Logs In Again', () =>{

  it('Employer deletes job post "Cypress Tester113"',()=>{ 
    login('karinasd07@hotmail.com', 'testing')    
    cy.visit('http://localhost:4200/')
    cy.wait(4000) 
    login('karinasd07@hotmail.com', 'testing')
    cy.url().should('eq', 'http://localhost:4200/')   
    cy.get('nav') 
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
    cy.wait(3000)
    cy.url().should('eq','http://localhost:4200/my-postings')
    cy.get('div.cardz').contains('Cypress Tester113').click()
    cy.contains('Delete').click()
    cy.wait(3000)
  })
})