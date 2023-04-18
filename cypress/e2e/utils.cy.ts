export const login = (email: string, password: string) => {
    cy.visit('http://localhost:4200/login')
    cy.get('input')
      .eq(0)
      .should('have.attr', 'name')
      .should('equal', 'Email')
    cy.get('input')
      .eq(0)
      .click({ force: true })
      .type(email)
    cy.get('input')
      .eq(1)
      .should('have.attr', 'name')
      .should('equal', 'Password')
    cy.get('input')
      .eq(1)
      .click()
      .type(password)
    cy.get('.pt-1')
      .find('.btn')        
      .click({ force: true })
    }
export const enterValueInInputEmployerForm = (index: number, value: string) => {
  cy.get('input')
    .eq(index)
    .click({ force: true })
    .clear()
    .type(value)
}

export const enterValueInTextAreaEmployerForm = (index: number, value: string) => {
  cy.get('textarea')
    .eq(index)
    .click({ force: true })
    .clear()
    .type(value)
}

export const enterValueInMatSelectEmployerForm = (index: number) => {
  cy.get('mat-select')
    .eq(index)
    .click({ force: true })
}
export const enterValueInMatOptionEmployerForm = (index: number) => {
  cy.get('mat-option')
    .eq(index)
    .click({ force: true })
}