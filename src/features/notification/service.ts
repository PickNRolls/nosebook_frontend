'use client';

import { combineLatestWith, map, mergeWith, Observable, scan, startWith, Subject } from 'rxjs';

import * as featuser from '@/features/user/client';

import { Notification } from './components/client';
import { cleanup } from '@/components/rxjs/cleanup';
import { visibilityChange } from '@/components/rxjs/visibility-change';
import { delayWhileVisible } from '@/components/rxjs/delay-while-visible';

export type Notification = {
  id(): string;
  producer(): featuser.Model;
  title(): string;
  message(): string;
  href(): string;
};

class Service {
  private static SHOW_DURATION_MS = 7000;
  private static CLEANUP_INTERVAL_MS = Service.SHOW_DURATION_MS * 1.2;
  private input$ = new Subject<Notification>();
  private removed$ = new Subject<Notification>();

  public notifications$: Observable<Notification[]>;

  public constructor() {
    const visible$ = visibilityChange();

    const remove$ = this.input$.pipe(
      delayWhileVisible(Service.SHOW_DURATION_MS),
      mergeWith(this.removed$),
      cleanup(Service.CLEANUP_INTERVAL_MS, visible$),
      scan((map, value) => {
        if (value === 'cleanup') {
          return new WeakMap();
        }

        map.set(value, true);
        return map;
      }, new WeakMap<Notification, boolean>),
      startWith(new WeakMap()),
    );

    this.notifications$ = this.input$.pipe(
      cleanup(Service.CLEANUP_INTERVAL_MS, visible$),
      scan((queue, value) => {
        if (value === 'cleanup') {
          return [];
        }

        return [...queue, value]
      }, [] as Notification[]),
      combineLatestWith(remove$),
      map(([queue, removed]) => {
        return queue.filter(notification => !removed.has(notification));
      }),
    );
  }

  public push(notification: Notification) {
    this.input$.next(notification)
  }

  public remove(notification: Notification) {
    this.removed$.next(notification);
  }
}

let instance: Service;
export const service = () => {
  if (instance) {
    return instance;
  }
  instance = new Service();
  return instance;
};

