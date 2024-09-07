export type Event<T = unknown> = {
  type: string;
  payload: T;
};

