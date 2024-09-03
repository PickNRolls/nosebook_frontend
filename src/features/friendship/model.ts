import * as featuser from '@/features/user/client';

import * as dto from '@/dto';

export type Relation = {
  friendIds?: string[];
  pendingRequesterIds?: string[];
  pendingResponderIds?: string[];
}

export type Model = dto.FindResult<featuser.Model>;

export type PageSection = 'all' | 'online';

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

