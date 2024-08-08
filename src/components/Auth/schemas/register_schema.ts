import zod from 'zod';
import { string } from './string';
import { password } from './password';

export const registerSchema = zod.object({
  firstName: string,
  lastName: string,
  nick: string,
  password,
});
