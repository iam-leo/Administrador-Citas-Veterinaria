// Fix autocomplete functions & methods
/// <reference types = "cypress" />

describe('Carga la página principal', () => {
  it('Carga el index.html', () => {
    cy.visit('https://127.0.0.1:5500/index.html');

    //Verificar el h1 con el texto
    cy.contains('[data-cy="titulo-proyecto"]', 'Administrador de Pacientes de Veterinaria');

    //Verificar si existe el h1
    cy.get('[data-cy="titulo-proyecto"]').should('exist');

    //Verificar si existe el h1 con el texto
    cy.get('[data-cy="titulo-proyecto"]')
      .invoke('text')
      .should('equal', 'Administrador de Pacientes de Veterinaria');

    //Verificar h2
    cy.get('[data-cy="citas-heading"]')
      .invoke('text')
      .then( text => {
        expect(text.trim()).to.equal('Administrar citas:')
      });
  });
});