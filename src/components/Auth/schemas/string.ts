import zod from 'zod';

export const string = zod.string({
  required_error: 'Обязательное поле'
}).min(1, {
  message: 'Обязательное поле'
}).max(64, {
  message: 'Поле может содержать максимум 64 символа'
});
