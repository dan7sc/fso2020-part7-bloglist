// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', credentials => {
  cy.request('POST', `${Cypress.env('apiServer')}/api/login`, credentials)
    .then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit(Cypress.env('apiClient'))
    })
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiServer')}/api/blogs`,
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit(Cypress.env('apiClient'))
})
