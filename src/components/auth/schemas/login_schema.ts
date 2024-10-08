import zod from 'zod';
import { string } from './string';
import { password } from './password';

export const loginSchema = zod.object({
  nick: string,
  password,
});
