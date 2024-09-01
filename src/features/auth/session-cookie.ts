export function generateSessionCookie(sessionId: string, userId: string): string {
  return `${sessionId}:${userId}`;
}

export function parseSessionCookie(cookie: string | undefined): [string, string] {
  if (!cookie) {
    return ['', ''];
  }
  return decodeURIComponent(cookie).split(':') as [string, string];
}
