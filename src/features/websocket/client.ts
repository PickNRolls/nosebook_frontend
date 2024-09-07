import { HOST } from "@/const";

let ws: WebSocket;

export function create() {
  if (ws) {
    return ws;
  }

  ws = new WebSocket(`http://${HOST}/connect/ws`);

  return ws;
}

