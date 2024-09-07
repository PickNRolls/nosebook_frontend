import { HOST } from "@/const";
import { Event } from "./event";

let ws: WS;

type UnsubscribeFn = () => void;
type MessageListener = <T = unknown>(event: Event<T>) => void;

class WS {
  private original: WebSocket;
  public constructor() {
    this.original = new WebSocket(`http://${HOST}/connect/ws`);
  }

  public unwrap() {
    return this.original;
  }

  public onMessage(type: string, listener: MessageListener): UnsubscribeFn {
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

