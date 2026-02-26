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
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('должен добавлять булку в конструктор', () => {
    cy.addBun('Краторная булка N-200i');
    cy.contains('Краторная булка N-200i (верх)').should('be.visible');
    cy.contains('Краторная булка N-200i (низ)').should('be.visible');
  });

  it('должен добавлять начинку в конструктор', () => {
    cy.addBun('Краторная булка N-200i');
    cy.addFilling('Биокотлета из марсианской Магнолии');
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('должен открывать модальное окно ингредиента при клике', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Краторная булка N-200i').should('be.visible');
    
    // Проверяем заголовки столбцов с пищевой ценностью
    cy.contains('Калории, ккал').should('be.visible');
    cy.contains(/Белки,\s*г/).should('be.visible');
    cy.contains(/Жиры,\s*г/).should('be.visible');
    cy.contains(/Углеводы,\s*г/).should('be.visible');
    
    // Проверяем наличие чисел (значения пищевой ценности)
    cy.contains('420').should('be.visible');
  });

  it('должен закрывать модальное окно по клику на крестик', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.closeModal();
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен закрывать модальное окно по клику на оверлей', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.closeModalByOverlay();
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен закрывать модальное окно по нажатию Escape', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.get('body').type('{esc}');
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен создавать заказ', () => {
    cy.addBun('Краторная булка N-200i');
    cy.addFilling('Биокотлета из марсианской Магнолии');
    
    cy.createOrder();
    
    cy.contains('12345').should('be.visible');
    cy.contains('идентификатор заказа').should('be.visible');
  });

  it('должен закрывать модальное окно заказа и очищать конструктор', () => {
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

