describe('List of cities', () => {
  const cities = [];

  it('should be displayed properly', () => {

    cy.visit('https://en.wikipedia.org/wiki/List_of_cities_in_the_United_Kingdom#List_of_cities');

    cy.get('#firstHeading').invoke('text').should('eq', 'List of cities in the United Kingdom');
    cy.get('#List_of_cities').invoke('text').should('eq', 'List of cities');

    cy.get('#mw-content-text .wikitable').eq(0).within(() => {
      for (let i = 0; i <= 9; i++) {
        cy.get('tr > td > a').eq(i).invoke('text').then((city) => {
          cities[i] = city;

          cy.origin('https://www.bbc.com', { args: { city } }, ({ city }) => {
            cy.visit('/weather');
            cy.log('Searching for ' + city);
            cy.get('#ls-c-search__input-label').type(city);
            cy.wait(2000);
            cy.get('#location-list > li > a', {timeout: 10000}).eq(0).click();
            cy.wait(2000);


            cy.contains('Saturday').eq(0).click();

          });
        });
      }
    });


  });

  it.skip('gmail', () => {
    // https://www.npmjs.com/package/cypress-social-logins
  });
});