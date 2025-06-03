describe('Lightbox', () => {
    beforeEach(() => {
        cy.visit('../../pages/lightbox.html')
    })

    it("ouverture de la lightbox au clic sur l’image", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="lightbox"]').should('be.visible')
        cy.get('[data-cy="lightbox"]').should('have.length', 1)
    })

    it("fermeture de la lightbox au clic en dehors de la lightbox", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('body').click(0, 0)
        cy.get('[data-cy="lightbox"]').should('not.be.visible')
    })

    it("ajout de la mention “j’aime” et mise à jour des compteurs sur l’overlay et la lightbox", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="like-button"]').click()
        cy.get('[data-cy="like-button"]').should('not.be.visible')
        cy.get('[data-cy="dislike-button"]').should('be.visible')
        cy.get('[data-cy="likes-count"]').should('contain', '1')
    })

    it("supression de la mention “jaime” et mise à jour des compteurs sur l’overlay et la lightbox", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="like-button"]').click()
        cy.get('[data-cy="dislike-button"]').click()
        cy.get('[data-cy="like-button"]').should('be.visible')
        cy.get('[data-cy="dislike-button"]').should('not.be.visible')
        cy.get('[data-cy="likes-count"]').should('contain', '0')
    })

    it("l'ajout d’un commentaire vide est impossible car le bouton “Publish” reste désactivé", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="comment-input"]').clear()
        cy.get('[data-cy="publish-button"]').should('be.disabled')
    })

    it("option qui cache les commentaires", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="comment-input"]').type('Wow, quelle photo rocambolesque !')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="comments"]').should('be.visible')
        cy.get('[data-cy="hide-comments-button"]').click()
        cy.get('[data-cy="comments"]').should('not.be.visible')
    })

    it("compteurs de commentaires sur l’overlay et la lightbox", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="comments-count"]').should('contain', '0')
        cy.get('[data-cy="hide-comments-button"]').should('contain', '0')
        cy.get('[data-cy="comment-input"]').type('Wow, quelle photo rocambolesque !')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="comments-count"]').should('contain', '1')
        cy.get('[data-cy="hide-comments-button"]').should('contain', '1')
        cy.get('[data-cy="comment-input"]').type('Je me suis perdu... Pouvez-vous m’aider ?')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="hide-comments-button"]').should('contain', '2')
        cy.get('[data-cy="comments-count"]').should('contain', '2')
    })

    it("singulier/pluriel en fonction du nombre de commentaire", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="comment-input"]').type('Wow, quelle photo rocambolesque !')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="hide-comments-button"]').should('contain', '1 comment')
        cy.get('[data-cy="comment-input"]').type('Je me suis perdu... Pouvez-vous m’aider ?')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="hide-comments-button"]').should('contain', '2 comments')
    })

    it("Écrire trois commentaires et tester la supression du second commentaire au clic sur la bonne croix", () => {
        cy.get('[data-cy="image"]').click()
        cy.get('[data-cy="comment-input"]').type('Wow, quelle photo rocambolesque !')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="comment-input"]').type('Je me suis perdu... Pouvez-vous m’aider ?')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="comment-input"]').type('C’est vraiment magnifique !')
        cy.get('[data-cy="publish-button"]').click()
        cy.get('[data-cy="comments"] [data-cy="delete-comment-button"]').eq(1).click()
        cy.get('[data-cy="comments"] [data-cy="comment"]').should('have.length', 2)
    })


})