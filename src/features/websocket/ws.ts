import { HOST } from "@/const";

import { Event, EventType } from "./event";

let ws: WS;
type UnsubscribeFn = () => void;
type MessageListener<T extends EventType> = (event: Event<T>) => void;

class WS {
  private original: WebSocket;
  public constructor() {
    this.original = new WebSocket(`http://${HOST}/connect/ws`);
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

    this.original.addEventListener('message', handle);
    return () => {
      this.original.removeEventListener('message', handle);
    };
  }
}

export function create() {
  if (ws) {
    return ws;
  }

  ws = new WS();
  return ws;
}

