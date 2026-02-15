import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { v4 as uuidv4 } from 'uuid';
import { addBun, addIngredient } from '../../services/slices/constructorSlice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const constructorBun = useSelector((state) => state.burgerConstructor.bun);
    const constructorIngredients = useSelector(
      (state) => state.burgerConstructor.ingredients
    );

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun({ ...ingredient, id: uuidv4() }));
      } else {
        dispatch(addIngredient({ ...ingredient, id: uuidv4() }));
      }
    };

    const currentCount =
      ingredient.type === 'bun'
        ? constructorBun?._id === ingredient._id
          ? 2
          : 0
        : Array.isArray(constructorIngredients)
          ? constructorIngredients.filter((item) => item._id === ingredient._id)
              .length
          : 0;

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={currentCount}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
