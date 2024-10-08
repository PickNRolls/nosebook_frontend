'use client';

import { FC, useEffect, useState } from "react";

import { format } from "../format";
import { isSuitableDate } from "../model";
import { NoSsr } from "@/components/no-ssr";

export type RealtimeDateProps = {
  date: Date;
};

export const RealtimeDate: FC<RealtimeDateProps> = (props) => {
  const { date } = props;
  const [string, setString] = useState<string>(format(date));

  useEffect(() => {
    setString(format(date));

    if (!isSuitableDate(date)) {
      return;
    }

    const timerId = setInterval(() => {
      setString(format(date))
    }, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  return <NoSsr><span>{string}</span></NoSsr>;
};
