/// <reference types="cypress" />

// Файл поддержки Cypress - загружается автоматически перед тестами
// Здесь можно добавить глобальную конфигурацию и поведение для Cypress

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(ingredientName: string): Chainable<void>;
      addBun(bunName: string): Chainable<void>;
      addFilling(fillingName: string): Chainable<void>;
      setupAuth(): Chainable<void>;
      clearAuth(): Chainable<void>;
      setupIntercepts(): Chainable<void>;
      openIngredientModal(ingredientName: string): Chainable<void>;
      closeModal(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;
      createOrder(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (ingredientName: string) => {
  cy.contains(ingredientName)
    .parent()
    .find('button')
    .contains('Добавить')
    .click();
});

Cypress.Commands.add('addBun', (bunName: string) => {
  cy.addIngredient(bunName);
});

Cypress.Commands.add('addFilling', (fillingName: string) => {
  cy.addIngredient(fillingName);
});

Cypress.Commands.add('setupAuth', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');
  });
});

Cypress.Commands.add('clearAuth', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
  cy.clearCookies();
});

Cypress.Commands.add('setupIntercepts', () => {
  cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');
});

Cypress.Commands.add('openIngredientModal', (ingredientName: string) => {
  cy.contains(ingredientName).click();
  cy.wait(100);
});

Cypress.Commands.add('closeModal', () => {
  cy.get('#modals').within(() => {
    cy.get('button').first().click();
  });
});

Cypress.Commands.add('closeModalByOverlay', () => {
  // Overlay рендерится как последний прямой потомок #modals
  // Используем cy.wrap для работы с DOM элементами
  cy.get('#modals').then(($modals) => {
    const children = $modals.children();
    // Overlay - это последний элемент
    const overlay = children.last();
    cy.wrap(overlay).click({ force: true });
  });
});

Cypress.Commands.add('createOrder', () => {
  cy.contains('Оформить заказ').click();
  cy.wait('@createOrder');
});

export {};

