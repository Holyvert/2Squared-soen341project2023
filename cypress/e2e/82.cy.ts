//Student logs in.
//Student clicks on "Interviews" section in the nav bar.
//User can view the interview cards in landing page.
import { login, enterValueInInputEmployerForm, enterValueInTextAreaEmployerForm, enterValueInMatSelectEmployerForm, enterValueInMatOptionEmployerForm  } from './utils.cy'
describe('Employer Create posts, Student Logs In and applies to post, Employer selects and unselects student and student sees it in inteview', () => {
    //Employer creates posts
    it('Redirects to Landing Page, checks if is Employer', () => {
        
        login('isaczu15@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(2)
          .contains('Create New Posting')
          cy.get('app-landing')
          .should('exist')
      })

      it('Employer clicks on "Create New Posting"', () => {
        login('isaczu15@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(2)
          .click()
          cy.url().should('eq', 'http://localhost:4200/employer-form') 

      })
      it('Employer fills up form with Image"', () => {
        login('isaczu15@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(2)
          .click()
          cy.url().should('eq', 'http://localhost:4200/employer-form') 
          enterValueInInputEmployerForm(0, 'Cypress Tester82')
          enterValueInInputEmployerForm(1, 'Ottowa')
          enterValueInMatSelectEmployerForm(0)
          enterValueInMatOptionEmployerForm(0)
          enterValueInInputEmployerForm(2, '22$/hour')
          enterValueInInputEmployerForm(3, '4 months')
          enterValueInInputEmployerForm(4, 'Eric Czuboka')
          enterValueInTextAreaEmployerForm(0, 'Testing with Cypress & web development')
          enterValueInTextAreaEmployerForm(1, 'Studying in related field')
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
        enterValueInInputEmployerForm(6, 'Izzy')
        enterValueInInputEmployerForm(7, 'Lamarre')
        enterValueInInputEmployerForm(8, 'www.boss.com')
        enterValueInInputEmployerForm(9, 'Montreal')
        enterValueInInputEmployerForm(10, 'Quebec')
        enterValueInInputEmployerForm(11, 'H9J 3B4')
        const p = './cypress/fixtures/Images/2023-03-19_13h43_24.jpg'
        cy.get('input')
        .eq(12)
        .selectFile(p, {force:true})
    cy.get('app-employer-form')
      .find('button')
      .eq(1)
      .click({ force: true });
    cy.wait(5000)
      .get('.mat-mdc-snack-bar-label')
      .should('exist');
       
      })

      //Student applies to post recently created
    it('Enters Credentials of a Student and applies to job', () => {
      login('am.czuboka@gmail.com', 'soen341')
      })

      it('Redirects to Landing Page, checks if is Student and sees Job Postings', () => {
        login('am.czuboka@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.wait(4000)
    cy.get('div.cardz')
      .contains('Cypress Tester82')
      .click()
    cy.contains('Apply').click()
    cy.wait(2000)
        
  })

    

     //Employer Select student for interview
     it('employer navigates back to home, redirect to "my postings" and select student for interview',()=>{    
        
        cy.visit('http://localhost:4200/')
        login('isaczu15@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/')   
        cy.get('nav') 
        .find('#myDIV')
        .find('ul')
        .find('li')
        .eq(1)
        .click()
        // Added this to make sure the page is loaded
        cy.wait(1000)
        cy.url().should('eq','http://localhost:4200/my-postings')
        cy.get('div.cardz')
        .contains('Cypress Tester82')
        .click()
        cy.contains('See Candidates')
        .click()
        cy.get('div.candidate-cards')
        .contains('Ann-Marie Czuboka')
      cy.contains('Select for Interview')
      .click()
      cy.wait(1000)
  })



      it('Student clicks on "Interviews"', () => {
        login('am.czuboka@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(2)
          .contains('Interviews')
          .click( {force: true} )
        cy.url().should('eq', 'http://localhost:4200/student-interviews')

        cy.get('div.student-int-cards').contains('Cypress Tester82')

      })

      it('Employer unselects candidate for interview in "Interviews"', () => {
        login('isaczu15@gmail.com', 'soen341')
        cy.wait(4000) 
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(3)
          .click()
          cy.wait(3000) //for page to load
          cy.url().should('eq', 'http://localhost:4200/employer-interviews')
          cy.get('div.employer-int-cards').contains('Ann-Marie Czuboka')
          cy.contains('Unselect from Interview').click()
          cy.wait(1000)
      })

      it('Student clicks on "Interviews"', () => {
        login('am.czuboka@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(2)
          .contains('Interviews')
          .click( {force: true} )
        cy.url().should('eq', 'http://localhost:4200/student-interviews')

        cy.get('div.student-int-cards').contains('Cypress Tester82').should('not.exist')

      })

      it('Employer deletes posting"', () => {
        cy.visit('http://localhost:4200/')
        login('isaczu15@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/')   
        cy.get('nav') 
        .find('#myDIV')
        .find('ul')
        .find('li')
        .eq(1)
        .click()
        // Added this to make sure the page is loaded
        cy.wait(1000)
        cy.url().should('eq','http://localhost:4200/my-postings')
        cy.get('div.cardz').contains('Cypress Tester82').click() //this works
        cy.contains('Delete').click()
        cy.get('.mat-mdc-snack-bar-label').contains('Cypress Tester82')
        .should('exist')  
        cy.wait(4000)

      })
  })