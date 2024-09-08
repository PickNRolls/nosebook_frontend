import { from, ObservableInput, timer, distinctUntilChanged, switchMap, Observable, of, startWith, take } from "rxjs";

export const pauseTimer = (
  due: number,
  playingNotifier$?: ObservableInput<boolean>,
) => {
  let lastPlayingAt = new Date().getTime();

  return from(playingNotifier$ || of(true)).pipe(
    startWith(true),
    distinctUntilChanged(),
    switchMap(playing => {
      if (playing) {
        lastPlayingAt = new Date().getTime();
        return timer(due);
      }

      due -= new Date().getTime() - lastPlayingAt;
      return new Observable();
    }),
    take(1),
  );
};

