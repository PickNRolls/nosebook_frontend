import * as featmessage from '@/features/message/client';

export type Event<T extends EventType> = {
  type: T;
  payload: EventsMap[T];
};

type EventsMap = {
  new_message: featmessage.Model;
};

export type EventType = keyof EventsMap;

