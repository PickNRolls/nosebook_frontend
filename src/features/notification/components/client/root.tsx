'use client';

import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import * as featnotif from '@/features/notification/client';

export const Root = () => {
  const [notifications, setNotifications] = useState<featnotif.Notification[]>([])
  const [entering, setEntering] = useState(false);
  const [animatingCount, setAnimatingCount] = useState(0);

  useEffect(() => {
    const sub = featnotif.service().notifications$.subscribe((n) => {
      setNotifications(n);
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <div
      className="fixed left-3 -bottom-[98px] h-[98px]"
      style={{
        transitionProperty: entering ? 'transform' : '',
        transitionDuration: entering ? '200ms' : '',
        transform: `translateY(-${animatingCount * 110}px)`
      }}
    >
      <TransitionGroup className="flex flex-col gap-[12px]">
        {notifications.map((n) => {
          return (
            <CSSTransition
              key={n.id()}
              timeout={200}
              classNames={{
                exitActive: "opacity-0 transition-opacity duration-200",
              }}
              onEnter={() => {
                setEntering(true);
                setAnimatingCount(prev => prev + 0.5);
              }}
              onEntered={() => {
                setEntering(false);
              }}
              onExited={() => {
                setAnimatingCount(prev => prev - 1);
              }}
            >
              <featnotif.components.Notification
                producer={n.producer()}
                title={n.title()}
                message={n.message()}
                href={n.href()}
                onClose={() => featnotif.service().remove(n)}
              />
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </div>
  );
};

