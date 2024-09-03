import * as featuser from '@/features/user/client';

export type Relation = {
  friendIds?: string[];
  pendingRequesterIds?: string[];
  pendingResponderIds?: string[];
}

export type Model = {
  type: 'incoming' | 'outcoming';
  accepted: boolean;
  user: featuser.Model;
};

export type PageSection = 'all' | 'online' | 'incoming_requests';

export function listPageHref(userId: string, opts?: {
  section?: PageSection;
}): string {
  let output = '/friends';
  const query: string[] = [`id=${userId}`];

  if (opts?.section) {
    query.push(`section=${opts.section}`)
  }

  if (query.length) {
    output += '?' + query.join('&')
  }

  return output;
}

