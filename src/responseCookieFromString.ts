import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const responseCookieFromString = (cookie: string): ResponseCookie => {
  const parts = cookie.split('; ');
  const result: ResponseCookie = {} as ResponseCookie;

  parts.forEach((part, index) => {
    const [key, value] = part.split('=');
    if (index === 0) {
      result.name = key;
      result.value = value;
    }

    if (key === 'Path') {
      result.path = value;
    }

    if (key === 'Domain') {
      result.domain = value;
    }

    if (key === 'Max-Age') {
      result.maxAge = Number(value);
    }

    if (key === 'HttpOnly') {
      result.httpOnly = true;
    }

    if (key === 'Secure') {
      result.secure = true;
    }
  });

  return result;
}
