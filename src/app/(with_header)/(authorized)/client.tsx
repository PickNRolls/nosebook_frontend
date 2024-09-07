'use client';

import { useEffect } from "react";

import * as featws from '@/features/websocket/client';

export const Client = () => {
  useEffect(() => {
    const ws = featws.create();
    console.log(ws);
  }, []);

  return null;
};
