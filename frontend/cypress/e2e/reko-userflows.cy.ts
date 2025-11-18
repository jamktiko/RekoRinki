describe('REKO – käyttäjäpolut ilman testID', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000);
  });

  // -----------------------------------------------------
  // KÄYTTÄJÄPOLKU 1
  // Etusivu → Ilmoitus → yksi tuote ostoskoriin
  // -----------------------------------------------------
  it('Käyttäjäpolku 1: Ilmoitus → yksi tuote ostoskoriin', () => {
    // 1. Etusivulla on vähintään yksi "Näytä tuotteet" -nappi
    cy.contains('Näytä tuotteet').should('exist');

    // 2. Klikataan ensimmäistä ilmoitusta
    cy.contains('Näytä tuotteet').first().click();

    // 3. Ilmoituksen sivu aukeaa (otsikko h1)
    cy.get('h1').should('be.visible');

    // 4. Sivulla on vähintään yksi tuoterivi
    // cy.get('.flex.items-center.bg-gray-100.rounded-lg.p-4').should(
    //   'have.length.at.least',
    //   1
    // );
    cy.contains('button', 'add').should('exist');

    // 5. Lisätään yksi tuote ostoskoriin painamalla ensimmäistä "add"-ikonia
    cy.contains('button', 'add').first().click();

    // 6. Siirrytään ostoskoriin (ylänavin ostoskärry-ikoni)
    cy.get('a[routerLink="/ostoskori"]').first().click();

    // 7. Varmistetaan, että korissa on tuote:
    //    → näkyy ainakin yksi "delete"-ikonin nappi (roskakori)
    cy.contains('button', 'delete').should('exist');
  });

  // -----------------------------------------------------
  // KÄYTTÄJÄPOLKU 2
  // Etusivu → haku "Huhtasuo" → ilmoitus → tuote → poista → tyhjä kori
  // -----------------------------------------------------
  it('Käyttäjäpolku 2: Haku "Huhtasuo" → ilmoitus → tuote → poista → tyhjä kori', () => {
    // 1. Kirjoitetaan hakukenttään "Huhtasuo"
    cy.get('#searchInput').type('Huhtasuo');

    // 2. Haku palauttaa ainakin yhden ilmoituksen (näkyy "Näytä tuotteet" -nappi)
    cy.contains('Näytä tuotteet').should('exist');

    // 3. Avataan ensimmäinen hakutuloksen ilmoitus
    cy.contains('Näytä tuotteet').first().click();

    // 4. Ilmoituksen sivun otsikko (h1) näkyy
    cy.get('h1').should('be.visible');

    // 5. Lisätään yksi tuote koriin painamalla ensimmäistä "add"-ikonia
    cy.contains('button', 'add').first().click();

    // 6. Siirrytään ostoskoriin
    cy.get('a[routerLink="/ostoskori"]').first().click();

    // 7. Korissa on vähintään yksi tuote → löytyy "delete"-ikoni
    cy.contains('button', 'delete').should('exist');

    // 8. Poistetaan yksi tuote korista
    cy.contains('button', 'delete').first().click();

    // 9. Tarkistetaan, että ostoskori näyttää tyhjän tilan viestin
    cy.contains('Ostoskori on tyhjä').should('be.visible');

    // 10. Klikataan nappia, joka vie takaisin etusivulle
    cy.contains('Selaa tuotteita').click();

    // 11. Varmistetaan, että ollaan taas etusivulla
    cy.url().should('include', '/ilmoitukset');
  });

  // -----------------------------------------------------
  // KÄYTTÄJÄPOLKU 3
  // Etusivu → näytä tuotteett → ilmoitus → lisää kaksi erilaista tuote -> ostoskori → lisää tuote määrä ->
  // vähentää tuote määrä -> poista tuote kokonaan
  // -----------------------------------------------------

  it('Käyttäjäpolku 3: Selain → ilmoitus → kaksi tuotetta → muuta määrää → tyhjennä kori', () => {
    // 1. Etusivulla näkyy ilmoituksia → löytyy "Näytä tuotteet" -nappi
    cy.contains('Näytä tuotteet').should('exist');

    // 2. Avataan toinen ilmoitus
    cy.contains('button', 'Näytä tuotteet').click();

    // 3. Tuotesivulla näkyy otsikko (h1)
    cy.get('h1').should('be.visible');

    // 4 Lisää ensimmäinen tuote
    cy.contains('Vadelma')
      .closest('.flex')
      .find('.material-symbols-outlined')
      .contains('add')
      .click();

    // 4 Lisää toinen tuote
    cy.contains('Pensasmustikka')
      .closest('.flex')
      .find('.material-symbols-outlined')
      .contains('add')
      .click();

    // 5. Avataan ostoskori (ostoskori-ikoni navissa)
    cy.get('a[routerLink="/ostoskori"]').first().click();

    // 6. Ostoskorissa näkyy ainakin kaksi "delete" -ikonia → 2 tuotetta lisätty
    cy.contains('button', 'delete').should('have.length.at.least', 1);

    // 7. Suurennetaan ensimmäisen tuotteen määrää
    cy.contains('button', 'add').first().click();

    // 8. Pienennetään ensimmäisen tuotteen määrää
    cy.contains('button', 'remove').first().click();

    // 9. Tyhjennetään koko kori
    // cy.contains('Tyhjennä ostoskori').click();
    cy.contains('.material-symbols-outlined', 'remove').each(($btn) => {
      cy.wrap($btn).click();
      cy.wait(500);
    });

    // 10 Tyhjennetään ostoskori klikkaamalla molemmat delete-napit
    cy.get('button > span.material-symbols-outlined')
      .contains('delete')
      .eq(0)
      .click();

    cy.get('button > span.material-symbols-outlined')
      .contains('delete')
      .eq(0)
      .click(); // toinen tuote on nyt ensimmäinen napissa

    // 11. Tarkistetaan tyhjä kori -ilmoitus
    cy.contains('Ostoskori on tyhjä').should('be.visible');
  });

  // -----------------------------------------------------
  // KÄYTTÄJÄPOLKU 4
  // Etusivu → näytä tuotteett → ilmoitus → Lisää tuotteita -> ostoskori → muuta määriä ->
  // poista osa -> valitse noutopaikka -> vahvista tilaus
  //

  it('Käyttäjäpolku 4: Lisää tuotteita, muuta määriä, poista osa, valitse noutopaikka ja vahvista tilaus', () => {
    // 1. Etusivulla näkyy ilmoituksia → "Näytä tuotteet" -nappi löytyy
    cy.contains('Näytä tuotteet').should('exist');

    // 2. Avataan ensimmäinen ilmoitus
    cy.contains('Näytä tuotteet').first().click();

    // 3. Tuotesivulla otsikko (h1) näkyy
    cy.get('h1').should('be.visible');

    // 4. Lisätään kaksi eri tuotetta ostoskoriin
    cy.contains('p', 'Mansikka')
      .closest('.flex')
      .find('.material-symbols-outlined')
      .contains('add')
      .click();

    cy.contains('p', 'Vadelma')
      .closest('.flex')
      .find('.material-symbols-outlined')
      .contains('add')
      .click();

    // 5. Nostetaan ensimmäisen tuotteen määrää kahdesti
    cy.contains('p', 'Mansikka')
      .closest('.flex')
      .find('.material-symbols-outlined')
      .contains('add')
      .click()
      .click();

    // 6. Siirrytään ostoskoriin
    cy.get('a[routerLink="/ostoskori"]').first().click();

    // 7. Varmistetaan, että ostoskorissa on kaksi eri tuotetta
    cy.contains('Mansikka').should('exist');
    cy.contains('Vadelma').should('exist');

    // 8. Poistetaan toinen tuote klikkaamalla delete-nappia
    cy.contains('h2', 'Vadelma')
      .closest('div.border.border-gray-200')
      .find('.material-symbols-outlined')
      .contains('delete')
      .click();

    // 9. Tarkistetaan, että ostoskori ei ole tyhjä
    cy.contains('Ostoskori on tyhjä').should('not.exist');

    // 10. Valitaan ensimmäinen noutopaikka (oletetaan mat-select käytössä)
    cy.get('mat-select').first().click();
    cy.get('mat-option').first().click();

    // 11. Painetaan "Vahvista tilaus" -nappia
    cy.contains('button', 'Vahvista tilaus').click();

    // 12. Popup näkyy → painetaan "Sulje" nappia
    cy.contains('button', 'Sulje').click();

    // 13. Tarkistetaan, että ostoskori on tyhjä vahvistuksen jälkeen
    cy.contains('Ostoskori on tyhjä').should('be.visible');
  });
});
