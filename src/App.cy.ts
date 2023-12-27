import App from './App.vue';

describe('LoginForm', () => {
  it('should redirect to welcome screen when creds are correct', () => {
    cy.mount(App);
    cy.contains('Email').find('input').type('Developer5@gmail.com');
    cy.contains('Password').find('input').type('123456');
    cy.intercept('POST', 'http://restapi.adequateshop.com/api/authaccount/login', {
      statusCode: 200,
      body: {
        message: 'Authenticated',
      },
    });
    cy.get('button').contains('Login').as('loginButton').click();
    cy.contains('Welcome Developer5@gmail.com!')
  });

  it('should show error message when creds are incorrect', () => {
    cy.mount(App);
    cy.contains('Email').find('input').type('baduser@gmail.com');
    cy.contains('Password').find('input').type('badpassword');
    cy.intercept('POST', 'http://restapi.adequateshop.com/api/authaccount/login', {
      statusCode: 401,
      body: {
        message: 'Bad email or password',
      },
    });
    cy.get('button').contains('Login').as('loginButton').click();
    cy.contains('Bad email or password');
  });
});