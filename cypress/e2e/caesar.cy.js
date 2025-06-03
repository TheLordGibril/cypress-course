describe('Caesar Cypher', () => {
    beforeEach(() => {
        cy.visit('../../pages/caesar.html');
    });

    it('Affiche les éléments de base', () => {
        cy.contains('Caesar Cypher');
        cy.contains('Vanilla JS');
        cy.get('input#key').should('exist');
        cy.get('textarea#text').should('exist');
        cy.contains('Cypher').should('exist');
    });

    it('Chiffre correctement le texte "Hello World!" avec une clé de 6', () => {
        cy.get('input#key').clear().type('6');
        cy.get('textarea#text').clear().type('Hello World!');
        cy.get('button').click();
        cy.get('#result').should('have.text', 'Nkrru Cuxrj!');
    });

    it('Ignore les caractères spéciaux et les majuscules/minuscules sont respectées', () => {
        cy.get('input#key').clear().type('13');
        cy.get('textarea#text').clear().type('Test 123!');
        cy.get('button').click();
        cy.get('#result').should('have.text', 'Grfg 123!');
    });
});
