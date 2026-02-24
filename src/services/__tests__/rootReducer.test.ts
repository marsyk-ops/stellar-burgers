import { rootReducer } from '../rootReducer';
import { TConstructorState } from '../slices/constructorSlice';
import { TIngredientsState } from '../slices/ingredientsSlice';

describe('rootReducer', () => {
  it('должен правильно инициализироваться', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('feeds');
  });

  it('должен иметь правильную начальную структуру', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
