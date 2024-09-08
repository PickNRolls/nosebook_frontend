import { map, mergeMap, Observable } from "rxjs";

import { pauseTimer } from "./pause-timer";

export const delayWhile = (due: number, notifier: () => Observable<boolean>) => {
  return <T = unknown>(observable: Observable<T>) => {
    return observable.pipe(
      mergeMap(value => pauseTimer(
        due,
        notifier(),
      ).pipe(
        map(() => value),
      ))
    );
  };
};

