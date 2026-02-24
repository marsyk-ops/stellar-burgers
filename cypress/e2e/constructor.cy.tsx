/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.setupIntercepts();
    cy.setupAuth();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearAuth();
  });

  it('должен загружать ингредиенты', () => {
    cy.wait('@getIngredients').then(() => {
      cy.contains('Краторная булка N-200i').should('be.visible');
      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
    });
  });

  it('должен добавлять булку в конструктор', () => {
    cy.wait('@getIngredients');
    cy.addBun('Краторная булка N-200i');
    
    cy.contains('Краторная булка N-200i (верх)').should('be.visible');
    cy.contains('Краторная булка N-200i (низ)').should('be.visible');
  });

  it('должен добавлять начинку в конструктор', () => {
    cy.wait('@getIngredients');
    cy.addBun('Краторная булка N-200i');
    cy.addFilling('Биокотлета из марсианской Магнолии');
    
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('должен открывать модальное окно ингредиента при клике', () => {
    cy.wait('@getIngredients');
    cy.openIngredientModal('Краторная булка N-200i');
    
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Краторная булка N-200i').should('be.visible');
  });

  it('должен закрывать модальное окно по клику на крестик', () => {
    cy.wait('@getIngredients');
    cy.openIngredientModal('Краторная булка N-200i');
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.closeModal();
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен закрывать модальное окно по клику на оверлей', () => {
    cy.wait('@getIngredients');
    cy.openIngredientModal('Краторная булка N-200i');
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.closeModalByOverlay();
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен закрывать модальное окно по нажатию Escape', () => {
    cy.wait('@getIngredients');
    cy.openIngredientModal('Краторная булка N-200i');
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.get('body').type('{esc}');
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен создавать заказ', () => {
    cy.wait('@getIngredients');
    cy.addBun('Краторная булка N-200i');
    cy.addFilling('Биокотлета из марсианской Магнолии');
    
    cy.createOrder();
    
    cy.contains('12345').should('be.visible');
    cy.contains('идентификатор заказа').should('be.visible');
  });

  it('должен закрывать модальное окно заказа и очищать конструктор', () => {
    cy.wait('@getIngredients');
    cy.addBun('Краторная булка N-200i');
    cy.addFilling('Биокотлета из марсианской Магнолии');
    
    cy.createOrder();
    
    cy.contains('12345').should('be.visible');
    
    cy.closeModalByOverlay();
    
    cy.contains('12345').should('not.exist');
    
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});

