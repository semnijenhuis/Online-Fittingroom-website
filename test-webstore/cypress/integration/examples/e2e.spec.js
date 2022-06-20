
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
it('add shirts', function() {
    cy.visit('http://hbo-a5-dev.surge.sh/');
    cy.get('.shop-button').click({force: true});
    cy.get('#first').click({force: true});
    cy.get('#\\30  > span').click({force: true});
    cy.get('#\\31 ').click({force: true});
    cy.get('#\\35 ').click({force: true});
    cy.get('#\\36  > span').click({force: true});
    cy.get('#\\37  > span').click({force: true});
    cy.get('#\\38 ').click({force: true});
    cy.get('#openTool > img').click({force: true});
    cy.get('.fittingroombutton').click({force: true});
});

it('adding trousers', function() {
    cy.visit('http://hbo-a5-dev.surge.sh/');
    cy.get('.shop-button').click({force: true});
    cy.get('#\\32 ').click({force: true});
    cy.get('#\\33 ').click({force: true});
    cy.get('#\\39  > span').click({force: true});
    cy.get('#\\31 0 > span').click({force: true});
    cy.get('#\\31 1 > span').click({force: true});
    cy.get('#openTool > img').click({force: true});
    cy.get('.fittingroombutton').click({force: true});
});

it('adding shoes', function() {
    cy.visit('http://hbo-a5-dev.surge.sh/');
    cy.get('.shop-button').click({force: true});
    cy.get('#\\31 2 > span').click({force: true});
    cy.get('#\\31 3 > span').click({force: true});
    cy.get('#\\31 5 > span').click({force: true});
    cy.get('#\\31 4 > span').click({force: true});
    cy.get('#openTool > img').click({force: true});
    cy.get('.modal-header').click({force: true});
    cy.get('.fittingroombutton').click({force: true});
});
it('adding jacket', function() {
    cy.visit('http://hbo-a5-dev.surge.sh/');
    cy.get('.shop-button').click({force: true});
    cy.get('#\\34  > span').click({force: true});
    cy.get('#openTool > img').click({force: true});
    cy.get('.fittingroombutton').click({force: true});
});
it('item check and back button', function() {
    cy.visit('http://hbo-a5-dev.surge.sh/');
    cy.get('.shop-button').click({force: true});
    cy.get(':nth-child(1) > .thumbnail > a > .webShopImage').click({force: true});
    cy.get('.fittingToolButton > span').click({force: true});

});