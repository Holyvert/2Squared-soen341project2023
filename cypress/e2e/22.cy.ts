// User logs in.
// User scrolls down the landing page and views all the job postings.
// User enters a search word inside the search bar above the job postings section.
// User can now see the narrowed down job-postings according to the search word entered in the search bar.
import { login } from './utils.cy'
describe('Student Logs In', () => {
    it('Enters Credentials of a Student', () => {
      login('am.czuboka@gmail.com', 'soen341')
      })

      it('Redirects to Landing Page, checks if is Student and sees Job Postings', () => {
        login('am.czuboka@gmail.com', 'soen341')
        cy.url().should('eq', 'http://localhost:4200/') 
        cy.wait(3000)
        cy.get('nav')
          .find('#myDIV')
          .find('ul')
          .find('li')
          .eq(1)
          .contains('Applied To')
          cy.get('app-landing')
          .should('exist')
      })
      it('Search Remote in Search Bar', () => {
        login('am.czuboka@gmail.com', 'soen341')
        cy.get('app-landing')
          .find('app-job-post')
          .find('app-search')
          .find('mat-label')
          .should('contain', 'Search by position, title or company')
        cy.get('app-search')
          .click()
          .type('Remote')
        cy.get('app-landing')
          .find('app-job-post')
          .eq(0)
          .find('.bottom-card')
          .find('.watch')
          .should('contain', 'Remote')
        cy.get('app-landing')
          .find('app-job-post')
          .eq(0)
          .find('.bottom-card')
          .find('.watch')
          .should('not.contain', 'Online')
      })
  })

  