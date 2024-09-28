'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import { map, merge, Observable, ReplaySubject, shareReplay, Subject, Subscription, tap } from "rxjs";

export type Props = {
  visible: boolean;
  onClose: () => void;
};

class Handler<P extends {} | null = null> {
  private props$ = new ReplaySubject<P>();
  private open$ = new Subject<void>();
  private close$ = new Subject<void>();
  public _dispose$ = new Subject<void>();
  public _visible$: Observable<boolean>;

  public constructor(private component: React.FC<P & Props>) {
    this._visible$ = merge(
      this.open$.pipe(map(() => true)),
      this.close$.pipe(map(() => false)),
    ).pipe(
      tap(visible => {
        const className = 'disable-vertical-scroll';
        if (visible) {
          document.body.classList.add(className);
        } else {
          document.body.classList.remove(className);
        }
      }),
      shareReplay(),
    );

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.dispose = this.dispose.bind(this);
    this.render = this.render.bind(this);
  }

  public open(props?: P) {
    this.open$.next();
    if (props) {
      this.props$.next(props);
    }
  }

  public close() {
    this.close$.next();
  }

  public dispose() {
    this._dispose$.next();
  }

  public render(): React.ReactNode {
    const [visible, setVisible] = useState(false);
    const [props, setProps] = useState<P>({} as P);

    useEffect(() => {
      const sub = new Subscription();
      sub.add(this._visible$.subscribe(setVisible));
      sub.add(this.props$.subscribe(setProps))

      return () => sub.unsubscribe();
    }, []);

    return <this.component {...props} visible={visible} onClose={this.close} />;
  }
}

export class Service {
  private map = new Map<Symbol, Handler<any>>;

  private stack: Handler<any>[] = [];

  private rerender$ = new Subject<void>();

  public constructor() {
    this.render = this.render.bind(this);
  }

  public handler<P extends {} = {}>(id: Symbol, component: React.FC<Props & P>): Handler<P> {
    const handler = new Handler<P>(component);

    this.map.set(id, handler);

    const sub = new Subscription();
    sub.add(handler._visible$.subscribe(visible => {
      if (visible) {
        this.stack.push(handler);
      } else {
        this.stack.pop();
      }

      this.rerender$.next();
    }));

    sub.add(handler._dispose$.subscribe(() => {
      sub.unsubscribe();
    }));

    return handler;
  }

  public render(): React.ReactNode {
    const [_, setState] = useState(0);

    useEffect(() => {
      const sub = this.rerender$.subscribe(() => {
        setState(prev => prev === 0 ? 1 : 0);
      });

      return () => sub.unsubscribe();
    }, []);

    if (!this.stack.length) {
      return null;
    }

    const last = this.stack[this.stack.length - 1];
    const Render = last.render;

    return <Render />;
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

