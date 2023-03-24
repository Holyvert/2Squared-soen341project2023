
// Employer logs in
// Employer goes to "My Postings"
// Employer clicks on one of his posts
// Employer clicks on delete
// Checks to see that that posting is gone in the database
import { login, enterValueInInputEmployerForm, enterValueInTextAreaEmployerForm, enterValueInMatSelectEmployerForm, enterValueInMatOptionEmployerForm } from './utils.cy'
describe('Employer Logs In', () => {
    // it('Enters Credentials of a Student', () => {
    //   login('isaczu15@gmail.com', 'soen341')
    //   })

// employer creates new posting for purpose of e2e test on one object
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
      it('Employer fills up form without Image"', () => {
        login('isaczu15@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(2)
          .click()
          cy.url().should('eq', 'http://localhost:4200/employer-form') 
          enterValueInInputEmployerForm(0, 'Cypress Tester88')
          enterValueInInputEmployerForm(1, 'New York')
          enterValueInMatSelectEmployerForm(0)
          enterValueInMatOptionEmployerForm(0)
          enterValueInInputEmployerForm(2, '30$/hour')
          enterValueInInputEmployerForm(3, '8 months')
          enterValueInInputEmployerForm(4, 'Ann-Marie Czuboka')
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
        enterValueInInputEmployerForm(6, 'Isabelle')
        enterValueInInputEmployerForm(7, 'Czuboka')
        enterValueInInputEmployerForm(8, 'www.twins.com')
        enterValueInInputEmployerForm(9, 'Montreal')
        enterValueInInputEmployerForm(10, 'Quebec')
        enterValueInInputEmployerForm(11, 'H9J 3B4')
        // const p = '/Users/ann-marieczuboka/Documents/SOEN 341/2Squared-soen341project2023/cypress/fixtures/Images/photo-1498050108023-c5249f4df085.png'
        // cy.get('input')
        //     .eq(12)
        //     .selectFile(p, {force:true})
        cy.get('app-employer-form')
            .find('button')
            .eq(1)
            .click( { force: true} ) 
        cy.get('.mat-mdc-snack-bar-label')
        .should('exist')  
       
      })

      it('employer navigates back to home, redirect to "my postings"',()=>{    
        
        cy.visit('http://localhost:4200/')
        login('isaczu15@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/')   
      cy.get('nav') 
      .find('#myDIV')
      .find('ul')
      .find('li')
      .eq(1)
      .click()
      // cy.pause()
      cy.url().should('eq','http://localhost:4200/my-postings')
      cy.get('div.cardz').contains('Cypress Tester88').click() //this works
      cy.contains('Delete').click()
      cy.get('.mat-mdc-snack-bar-label').contains('Posting Cypress Tester88')
      .should('exist')  
      cy.wait(4000)
      // cy.pause()
})
// const URL="http://localhost:4200/individual?ApplicationMethod=Square&City=d&Company=&Deadline=2023-03-24&Description=d&DocsRequired=No%20Documents&Duration=d&Email=jonmicahmiller@gmail.com&EmployerID=UWRD0FcUhXcdn6LNJl2yytEsCMY2&ID=0cj4vftzs2tt&Image=https:%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsquared-e7104.appspot.com%2Fo%2Fimages%252F6etdqcxs0zg2023-03-19_13h43_24.jpg%3Falt%3Dmedia%26token%3Df0e1941e-e256-46b9-9130-41cbcb503e1a&JcFirstName=d&JcLastName=d&JobLocation=d&JobLocationType=On-site&JobTitle=Acceptence%20Test%2088&PostalCode=d&Province=d&Requirements=d&Salary=d&Supervisor=d&Website=d"



  })
