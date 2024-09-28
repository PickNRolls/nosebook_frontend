'use client';

import { createPortal } from "react-dom";

import * as featmodal from '@/features/modal/client';
import { NoSsr } from "@/components/no-ssr";
import { FC, ReactNode } from "react";

const Portal: FC<{ children: ReactNode }> = ({ children }) => {
  return createPortal(children, document.body);
};

export const Root = () => {
  const Render = featmodal.service().render;

  return (
    <NoSsr>
      <Portal>
        <Render />
      </Portal>
    </NoSsr>
  );
};

