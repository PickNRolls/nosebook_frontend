import { map, merge, Observable, of, switchMap } from "rxjs";
import { pauseTimer } from "./pause-timer";

export const cleanup = (period: number, toggleNotifier$?: Observable<boolean>) => {
  const toggle$ = toggleNotifier$ || of(true);

  return <T = unknown>(observable: Observable<T>) => {
    return observable.pipe(
      switchMap((value) => merge(of(value), pauseTimer(period, toggle$).pipe(
        map(() => 'cleanup' as const),
      ))),
    );
  }
}

