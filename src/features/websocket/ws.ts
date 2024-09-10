import { Event, EventType } from "./event";

let instance: WS | null = null;
export type UnsubscribeFn = () => void;
type MessageListener<T extends EventType> = (event: Event<T>) => void;

class WS {
  private original: WebSocket | null = null;
  public constructor() {
    this.original = new WebSocket('/connect/ws');
  }

  public unwrap() {
    return this.original;
  }

  public onMessage<T extends EventType>(type: T, listener: MessageListener<T>): UnsubscribeFn {
    const handle = (event: MessageEvent) => {
      const json = JSON.parse(event.data);
      if (json.type === type) {
        listener(json);
      }
    }

    this.original?.addEventListener('message', handle);
    return () => {
      this.original?.removeEventListener('message', handle);
    };
  }

  public close() {
    const NORMAL_CLOSE = 1000;
    this.original?.close(NORMAL_CLOSE);
    this.original = null;
    instance = null;
  }
}

export function ws(): WS {
  if (instance) {
    return instance;
  }

  instance = new WS();
  return instance;
}

