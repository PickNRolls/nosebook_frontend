'use client';

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import cn from 'classnames';

import * as dto from '@/dto';


export type UseCursorFetchProps<T = unknown> = {
  initial: dto.FindResult<T> | undefined;
  onFetch: (next: string) => Promise<dto.FindResult<T> | undefined>;
  direction?: 'bottom' | 'up';
};

export type UseCursorFetchOut<T = unknown> = {
  observer: ReactNode,
  loading: boolean;
  data: T[];
};

export const useCursorFetch = <T = unknown>(props: UseCursorFetchProps<T>): UseCursorFetchOut<T> => {
  const { initial, onFetch, direction = 'bottom' } = props;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [observerNode, setObserverNode] = useState<HTMLDivElement | null>(null);
  const currentQuery = useRef(initial);

  useEffect(() => {
    if (!observerNode) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async entry => {
        if (entry.intersectionRatio === 0) {
          return;
        }

        if (!currentQuery.current?.next) {
          return;
        }

        setLoading(true);
        try {
          await new Promise(async resolve => {
            const res = await onFetch(currentQuery.current!.next!);
            if (res) {
              setTimeout(() => {
                currentQuery.current = res;
                setData((prev) => [...prev, ...res.data])
                resolve(null);
              }, 500);
            }
          });
        } finally {
          setLoading(false);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(observerNode);
    return () => {
      observer.disconnect();
    };
  }, [onFetch, observerNode]);

  return {
    observer: (
      <div
        className={cn("relative", direction === 'bottom' ? '-top-[500px]' : 'top-[200px]')}
        ref={(node) => setObserverNode(node)}
      />
    ),
    loading,
    data: useMemo(() => props.initial?.data.concat(data) || [], [props.initial, data]),
  };
}
