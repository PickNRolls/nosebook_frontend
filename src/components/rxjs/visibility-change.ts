import { distinctUntilChanged, fromEvent, map, startWith } from "rxjs";

export const visibilityChange = () => {
  return fromEvent(document, 'visibilitychange').pipe(
    map(() => !document.hidden),
  ).pipe(
    startWith(!document.hidden),
    distinctUntilChanged(),
  );
};

