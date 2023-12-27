import LoginForm from '../LoginForm.vue';

describe('LoginForm', () => {
  it('should mount the component', () => {
    cy.mount(LoginForm);
  });

  it('should have password input of type password', () => {
    cy.mount(LoginForm);
    cy.contains('Password')
      .find('input')
      .should('have.attr', 'type', 'password');
  });

  it('should render title with default text', () => {
    cy.mount(LoginForm);
    cy.get('legend').should('have.text', 'Log In');
  });

  it('should render title with specified text', () => {
    const title = 'Please Authenticate';
    cy.mount(LoginForm, {
      props: {
        title,
      },
    });
    cy.get('legend').should('have.text', title);
  });

  describe('form tests', () => {
    const email = 'Developer5@gmail.com';
    const password = '123456';

    beforeEach(() => {
      const onLoginSpy = cy.spy().as('onLoginSpy');
      cy.mount(LoginForm, {
        props: {
          onLogin: onLoginSpy,
        },
      });
      cy.contains('Email').find('input').as('emailInput');
      cy.contains('Password').find('input').as('passwordInput');
      cy.get('button').contains('Login').as('loginButton');
    });

    it('should call onLogin with email and password when the Login button is clicked', () => {
      cy.get('@emailInput').type(email);
      cy.get('@passwordInput').type(password);
      cy.get('@loginButton').click();
      cy.get('@onLoginSpy').should('have.been.calledWith', {
        email,
        password,
      });
    });

    it('should call onLogin with email and password when enter is pressed in an input', () => {
      cy.get('@emailInput').type(email);
      cy.get('@passwordInput').type(password).type('{enter}');
      cy.get('@onLoginSpy').should('have.been.calledWith', {
        email,
        password,
      });
    });

    it('should show both validation errors if login is attempted without entering username or password', () => {
      cy.get('@loginButton').click();
      cy.contains('Email is required');
      cy.contains('Password is required');
      cy.get('@onLoginSpy').should('not.have.been.called');
    });

    it('should only show password validation error if login is attempted without entering password', () => {
      cy.get('@emailInput').type(email);
      cy.get('@loginButton').click();
      cy.contains('Email is required').should('not.exist');
      cy.contains('Password is required');
      cy.get('@onLoginSpy').should('not.have.been.called');
    });

    it('should only show email validation error if login is attempted without entering email', () => {
      cy.get('@passwordInput').type(password);
      cy.get('@loginButton').click();
      cy.contains('Email is required');
      cy.contains('Password is required').should('not.exist');
      cy.get('@onLoginSpy').should('not.have.been.called');
    });

    it('should not show any validation errors before login is attempted', () => {
      cy.contains('Email is required').should('not.exist');
      cy.contains('Password is required').should('not.exist');
    });
  });
});