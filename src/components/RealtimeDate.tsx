'use client';

import { FC, useEffect, useState } from "react";
import { formatRealtimeDate } from "./formatRealtimeDate";
import { isGoodDateForRealtimeUpdate } from "./isGoodDateForRealtimeUpdate";

export type RealtimeDateProps = {
  date: Date;
};

export const RealtimeDate: FC<RealtimeDateProps> = (props) => {
  const { date } = props;
  const [string, setString] = useState<string>('');

  useEffect(() => {
    setString(formatRealtimeDate(date));

    if (!isGoodDateForRealtimeUpdate(date)) {
      return;
    }

    const timerId = setInterval(() => {
      setString(formatRealtimeDate(date))
    }, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  return string;
};
