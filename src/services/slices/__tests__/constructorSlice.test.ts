import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  TConstructorState
} from '../constructorSlice';
import { TConstructorIngredient } from '@utils-types';

const mockBun: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'test-bun-id-1'
};

const mockIngredient1: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'test-ingredient-id-1'
};

const mockIngredient2: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  id: 'test-ingredient-id-2'
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

describe('constructorSlice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('addBun', () => {
    it('должен добавлять булку в конструктор', () => {
      const action = addBun(mockBun);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
    });

    it('должен заменять существующую булку', () => {
      const newBun: TConstructorIngredient = {
        ...mockBun,
        _id: 'new-bun-id',
        name: 'Новая булка',
        id: 'new-bun-id-1'
      };

      const stateWithBun = constructorReducer(initialState, addBun(mockBun));
      const state = constructorReducer(stateWithBun, addBun(newBun));

      expect(state.bun).toEqual(newBun);
      expect(state.bun?._id).toBe('new-bun-id');
    });
  });

  describe('addIngredient', () => {
    it('должен добавлять ингредиент в конструктор', () => {
      const action = addIngredient(mockIngredient1);
      const state = constructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockIngredient1);
    });

    it('должен добавлять несколько ингредиентов', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toEqual(mockIngredient1);
      expect(state.ingredients[1]).toEqual(mockIngredient2);
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент по индексу', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));

      expect(state.ingredients).toHaveLength(2);

      const action = removeIngredient(0);
      state = constructorReducer(state, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockIngredient2);
    });

    it('не должен удалять ингредиент при неверном индексе', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );

      const action = removeIngredient(10);
      state = constructorReducer(state, action);

      expect(state.ingredients).toHaveLength(1);
    });

    it('не должен удалять ингредиент при отрицательном индексе', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );

      const action = removeIngredient(-1);
      state = constructorReducer(state, action);

      expect(state.ingredients).toHaveLength(1);
    });

    it('не должен удалять ингредиент из пустого конструктора', () => {
      const action = removeIngredient(0);
      const state = constructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    it('должен изменять порядок ингредиентов', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));

      expect(state.ingredients[0]).toEqual(mockIngredient1);
      expect(state.ingredients[1]).toEqual(mockIngredient2);

      const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
      state = constructorReducer(state, action);

      expect(state.ingredients[0]).toEqual(mockIngredient2);
      expect(state.ingredients[1]).toEqual(mockIngredient1);
    });

    it('не должен изменять порядок при одинаковых индексах', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));

      const originalOrder = [...state.ingredients];
      const action = moveIngredient({ dragIndex: 0, hoverIndex: 0 });
      state = constructorReducer(state, action);

      expect(state.ingredients).toEqual(originalOrder);
    });

    it('не должен изменять порядок при неверных индексах', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );

      const originalOrder = [...state.ingredients];
      const action = moveIngredient({ dragIndex: 0, hoverIndex: 10 });
      state = constructorReducer(state, action);

      expect(state.ingredients).toEqual(originalOrder);
    });

    it('не должен изменять порядок при отрицательных индексах', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));

      const originalOrder = [...state.ingredients];
      const action = moveIngredient({ dragIndex: -1, hoverIndex: 0 });
      state = constructorReducer(state, action);

      expect(state.ingredients).toEqual(originalOrder);
    });

    it('не должен изменять порядок в пустом конструкторе', () => {
      const originalOrder = [...initialState.ingredients];
      const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
      const state = constructorReducer(initialState, action);

      expect(state.ingredients).toEqual(originalOrder);
    });
  });

  describe('clearConstructor', () => {
    it('должен очищать конструктор', () => {
      let state = constructorReducer(initialState, addBun(mockBun));
      state = constructorReducer(state, addIngredient(mockIngredient1));
      state = constructorReducer(state, addIngredient(mockIngredient2));

      expect(state.bun).not.toBeNull();
      expect(state.ingredients).toHaveLength(2);

      const action = clearConstructor();
      state = constructorReducer(state, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
