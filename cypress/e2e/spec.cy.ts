
describe('LoginForm', () => {
  it('load successfully', () => {
    cy.visit('http://192.168.1.113:8888/')
    cy.contains('Email').find('input').type('Developer5@gmail.com');
    cy.contains('Password').find('input').type('123456');
    cy.get('button').contains('Login').as('loginButton').click();
    cy.contains('Welcome Developer5@gmail.com!'); 
  });
});