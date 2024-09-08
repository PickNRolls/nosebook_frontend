import * as featmessage from '@/features/message/client';
import * as featuser from '@/features/user/client';

export type Event<T extends EventType> = {
  type: T;
  payload: EventsMap[T];
};

type EventsMap = {
  new_message: featmessage.Model;
  post_liked: {
    id: string;
    message: string;
    liker: featuser.Model;
  };
  comment_liked: {
    id: string;
    message: string;
    liker: featuser.Model;
  };
};

export type EventType = keyof EventsMap;

