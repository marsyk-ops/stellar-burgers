import { FC, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrderByNumber as fetchOrderByNumberFromFeeds } from '../../services/slices/feedsSlice';
import { fetchOrderByNumber as fetchOrderByNumberFromOrders } from '../../services/slices/ordersSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const isFromFeeds = location.pathname.startsWith('/feed');
  const currentOrder = isFromFeeds
    ? useSelector((state) => state.feeds.currentOrder)
    : useSelector((state) => state.orders.currentOrder);

  useEffect(() => {
    if (number) {
      const orderNumber = Number(number);
      if (isFromFeeds) {
        dispatch(fetchOrderByNumberFromFeeds(orderNumber));
      } else {
        dispatch(fetchOrderByNumberFromOrders(orderNumber));
      }
    }
  }, [dispatch, number, isFromFeeds]);

  const orderData = currentOrder;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
