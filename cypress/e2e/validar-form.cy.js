/// <reference types="cypress" />

describe('Valida el formulario', () => {
    //Enviar formulario vacío y mostrar alerta de error
    it('Submit form y lanzar alerta de error', () => {
        cy.visit('https://127.0.0.1:5500/index.html');

        //Enviar form vacío
        cy.get('[data-cy="form"]')
            .submit();

        //Verificar si renderiza la alerta
        cy.get('#swal2-title').should('exist');

        //Verificar si renderiza la alerta con el texto de "Todos los campos son obligatorios"
        cy.get('#swal2-title')
            .invoke('text')
            .should('equal', 'Todos los campos son obligatorios.');

        //Verificar que el boton de ok de la alerta funciona
        cy.get('.swal2-confirm').click()
    })
})