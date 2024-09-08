import { Observable } from "rxjs"
import { visibilityChange } from "./visibility-change";
import { delayWhile } from "./delay-while";

export const delayWhileVisible = (due: number) => {
  return <T = unknown>(observable: Observable<T>) => {
    return observable.pipe(
      delayWhile(due, visibilityChange),
    );
  };
}

