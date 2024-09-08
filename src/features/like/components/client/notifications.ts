import * as featuser from '@/features/user/client';
import * as featnotif from '@/features/notification/client';
import * as featws from '@/features/websocket/client';

export class PostLikedNotification implements featnotif.Notification {
  public constructor(private event: featws.Event<'post_liked'>) { }

  id(): string {
    return this.event.payload.id;
  }

  title(): string {
    return 'Вашу запись оценили';
  }

  message(): string {
    return 'оценил вашу запись'
  }

  producer(): featuser.Model {
    return this.event.payload.liker;
  }

  href(): string {
    return '';
  }
}

export class CommentLikedNotification implements featnotif.Notification {
  public constructor(private event: featws.Event<'comment_liked'>) { }

  id(): string {
    return this.event.payload.id;
  }

  title(): string {
    return 'Ваш комментарий понравился';
  }

  message(): string {
    return 'оценил ваш комментарий'
  }

  producer(): featuser.Model {
    return this.event.payload.liker;
  }

  href(): string {
    return '';
  }
}
