import { getCookie } from './cookie';
import { TOrder, TOrdersData } from './types';

const URL = process.env.BURGER_API_URL;

type TWebSocketMessage = {
  success: boolean;
  orders?: TOrder[];
  total?: number;
  totalToday?: number;
  message?: string;
};

type TWebSocketCallbacks = {
  onMessage: (data: TOrdersData) => void;
  onError?: () => void;
  onClose?: () => void;
};

export class WebSocketService {
  constructor(url: string, callbacks: TWebSocketCallbacks) {
    this.url = url;
    this.callbacks = callbacks;
  }

  private url: string;
  private callbacks: TWebSocketCallbacks;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private shouldReconnect = true;

  connect(): void {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data: TWebSocketMessage = JSON.parse(event.data);

          if (data.success && data.orders) {
            this.callbacks.onMessage({
              orders: data.orders,
              total: data.total ?? 0,
              totalToday: data.totalToday ?? 0
            });
          }
        } catch (error) {
          // ignored
        }
      };

      this.ws.onerror = () => {
        if (this.callbacks.onError) {
          this.callbacks.onError();
        }
      };

      this.ws.onclose = () => {
        if (this.callbacks.onClose) {
          this.callbacks.onClose();
        }
        if (
          this.shouldReconnect &&
          this.reconnectAttempts < this.maxReconnectAttempts
        ) {
          this.reconnectAttempts++;
          setTimeout(() => {
            this.connect();
          }, this.reconnectDelay);
        }
      };
    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError();
      }
    }
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }
}

export const createFeedsWebSocket = (
  callbacks: TWebSocketCallbacks
): WebSocketService => {
  if (!URL) {
    throw new Error('BURGER_API_URL is not defined');
  }
  const wsUrl = URL.replace(/^http/, 'ws');
  const url = `${wsUrl}/orders/all`;
  return new WebSocketService(url, callbacks);
};

export const createOrdersWebSocket = (
  callbacks: TWebSocketCallbacks
): WebSocketService => {
  if (!URL) {
    throw new Error('BURGER_API_URL is not defined');
  }
  const token = getCookie('accessToken');
  if (!token) {
    throw new Error('Access token is not available');
  }
  const wsUrl = URL.replace(/^http/, 'ws');
  const url = `${wsUrl}/orders?token=${token}`;
  return new WebSocketService(url, callbacks);
};
