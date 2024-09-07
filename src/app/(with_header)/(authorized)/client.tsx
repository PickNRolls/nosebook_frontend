'use client';

import { useEffect } from "react";

import * as featws from '@/features/websocket/client';
import { useRouter } from "next/navigation";

export const Client = () => {
  const router = useRouter();

  useEffect(() => {
    const ws = featws.create();

    const unsubscribe = ws.onMessage('new_message', () => {
      router.refresh();
    });

    return unsubscribe;
  }, []);

  return null;
};
