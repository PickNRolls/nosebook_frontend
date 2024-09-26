'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { Textinput } from '../text-input';

import * as featuser from '@/features/user/client';
import * as dto from '@/dto';
import { debounceTime, filter, from, map, merge, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { Popup } from '../popup';
import { Link } from '../link';
import { Spinner } from '../spinner';

export type HeaderFinderProps = {
  onUserSearch: (text: string) => Promise<dto.FindResult<featuser.Model>>;
};

export const HeaderFinder: FC<HeaderFinderProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<featuser.Model[]>([]);
  const [{ value$, focus$ }] = useState(() => {
    const value$ = new Subject<string>();
    const focus$ = new Subject<boolean>();

    const trim$ = value$.pipe(
      map(s => s.trim()),
    );

    merge(focus$.pipe(
      withLatestFrom(trim$),
      map(([focused, value]) => {
        if (!value) {
          return false;
        }

        return focused;
      })
    ), trim$.pipe(
      map(value => value.length > 0),
    )).subscribe(setVisible);

    trim$.pipe(
      tap(() => setLoading(true)),
      debounceTime(700),
      filter(s => s.length > 0),
      switchMap(s => {
        return from(props.onUserSearch(s))
      }),
      tap(() => setLoading(false)),
      map(res => res.data),
    ).subscribe(setUsers);

    return {
      value$,
      focus$,
    };
  });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (event.target && ref.current?.contains(event.target as Node)) {
        return;
      }

      focus$.next(false);
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleChange = async (value: string) => {
    setValue(value);
    value$.next(value);
  };

  return (
    <div ref={ref} className="mr-auto">
      <div className="relative">
        <svg aria-hidden="true" display="block" viewBox="0 0 16 16" width="16" height="16" className="text-slate-400 absolute left-[12px] top-[8px]">
          <path fill="currentColor" d="M6.5 1a5.5 5.5 0 0 1 4.384 8.823l3.895 3.9a.75.75 0 0 1-1.061 1.06l-3.895-3.9A5.5 5.5 0 1 1 6.5 1m0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8"></path>
        </svg>
        <Textinput
          value={value}
          onChange={handleChange}
          className="h-[32px] border-none pb-[2px] pl-[36px]"
          placeholder="Поиск"
          hasOutline={false}
          onFocus={() => focus$.next(true)}
        />
      </div>
      <Popup visible={visible} anchor={ref.current!} placement="bottom-start">
        <div className="flex flex-col min-w-[230px]">
          {loading && (
            <Spinner className="h-[200px]" />
          )}

          {!loading && users.length > 0 && users.map(user => {
            return (
              <Link
                view="no-style"
                href={featuser.profilePageHref(user.id)}
                onClick={() => {
                  setValue('');
                  value$.next('');
                }}
                className="flex gap-2 items-center px-3 h-[60px] cursor-pointer hover:bg-slate-100 rounded-lg w-full"
                key={user.id}
              >
                <featuser.components.Avatar user={user} className="size-[40px]" outline={false} />
                <div className="flex flex-col justify-start h-[30px]">
                  <featuser.components.Link user={user} view="dark" className="font-normal" dropHref />
                </div>
              </Link>
            );
          })}

          {!loading && users.length == 0 && (
            <div className="text-center text-[14px] text-slate-400 py-3">
              Не смогли ничего найти :(
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
};
