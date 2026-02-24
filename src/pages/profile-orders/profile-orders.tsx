import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrders,
  updateOrdersFromWebSocket
} from '../../services/slices/ordersSlice';
import { createOrdersWebSocket } from '../../utils/websocket';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const wsRef = useRef<ReturnType<typeof createOrdersWebSocket> | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());

    try {
      const ws = createOrdersWebSocket({
        onMessage: (data) => {
          dispatch(updateOrdersFromWebSocket(data.orders));
        },
        onError: () => {},
        onClose: () => {}
      });

      ws.connect();
      wsRef.current = ws;
    } catch (error) {}

    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
