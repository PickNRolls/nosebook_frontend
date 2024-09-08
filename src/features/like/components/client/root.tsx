import { useEffect } from "react";

import * as featws from '@/features/websocket/client';
import * as featnotif from '@/features/notification/client';

import { CommentLikedNotification, PostLikedNotification } from "./notifications";


export const Root = () => {
  useEffect(() => {
    const ws = featws.ws();
    const unsubscriptions: featws.UnsubscribeFn[] = [];

    unsubscriptions.push(ws.onMessage('post_liked', (event) => {
      featnotif.service().push(new PostLikedNotification(event));
    }));

    unsubscriptions.push(ws.onMessage('comment_liked', event => {
      featnotif.service().push(new CommentLikedNotification(event));
    }));

    return () => {
      for (let i = 0; i < unsubscriptions.length; i++) {
        unsubscriptions[i]();
      }
    };
  }, []);

  return null;
};

