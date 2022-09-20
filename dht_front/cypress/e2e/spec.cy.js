describe('Teste cliente', () => {
  it('cadastro de conta', () => {
    cy.visit('/')
    cy.get('a[id=cadastro]').click()
    cy.get('input[id=name]').type("TESTE-CONTA")
    cy.get('input[id=cpf]').type("329.856.326-92")
    cy.get('input[id=email]').type("CONTA-TESTE@1234.COM")
    cy.get('input[id=birthDate]').type("2002-01-21")
    cy.get('input[id=password]').type("123456")
    cy.get('button[type=submit]').click()
    cy.url().should(
      'equal',
      'http://localhost:3000/',
    );
  })

  it('Login', () => {
    cy.visit('/')
    cy.get('input[id=email]').type("CONTA-TESTE@1234.COM")
    cy.get('input[id=password]').type("123456")
    cy.get('button[type=submit]').click()
    cy.url().should(
      'equal',
      'http://localhost:3000/home?user=329.856.326-92&admin=null',
    );
  })

  it('logout', () => {
    cy.get('button[id=button-menu]').click()
    cy.get('a[id=logout]').click()
    cy.url().should(
      'equal',
      'http://localhost:3000/',
    );
  })
})