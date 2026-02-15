import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  updateFeedsFromWebSocket
} from '../../services/slices/feedsSlice';
import { createFeedsWebSocket } from '../../utils/websocket';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feeds.orders);
  const total = useSelector((state) => state.feeds.total);
  const totalToday = useSelector((state) => state.feeds.totalToday);
  const isLoading = useSelector((state) => state.feeds.isLoading);
  const wsRef = useRef<ReturnType<typeof createFeedsWebSocket> | null>(null);

  useEffect(() => {
    dispatch(fetchFeeds());

    try {
      const ws = createFeedsWebSocket({
        onMessage: (data) => {
          dispatch(updateFeedsFromWebSocket(data));
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

  if (isLoading && orders.length === 0) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
