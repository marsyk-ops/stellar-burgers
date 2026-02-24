import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, clearOrder } from '../../services/slices/ordersSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const orderRequest = useSelector((state) => state.orders.isLoading);
  const currentOrder = useSelector((state) => state.orders.currentOrder);
  const user = useSelector((state) => state.user.user);

  const constructorItems = {
    bun,
    ingredients: Array.isArray(ingredients) ? ingredients : []
  };

  const onOrderClick = async () => {
    if (!bun || orderRequest) {
      return;
    }

    if (!user) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    const orderIngredients = [
      bun._id,
      ...(Array.isArray(ingredients) ? ingredients.map((ing) => ing._id) : []),
      bun._id
    ];

    try {
      await dispatch(createOrder(orderIngredients)).unwrap();
      dispatch(clearConstructor());
    } catch (error) {
      // Ошибка игнорируется
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      (Array.isArray(ingredients)
        ? ingredients.reduce(
            (s: number, v: TConstructorIngredient) => s + v.price,
            0
          )
        : 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
