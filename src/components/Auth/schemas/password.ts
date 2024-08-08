import zod from 'zod';

export const password = zod.string({
  required_error: 'Обязательное поле',
}).min(8, {
  message: 'Поле должно содержать как минимум 8 символов'
}).max(64, {
  message: 'Поле может содержать максимум 64 символа'
});
