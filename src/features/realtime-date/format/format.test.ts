import { format } from "./format";

describe('formatRealtimeDate', () => {
  test('Сейчас', () => {
    expect(format(new Date())).toBe("Только что");
  });

  test('В пределах 10 секунд', () => {
    const date = new Date();
    date.setTime(date.getTime() - 1000 * 10);

    expect(format(date)).toBe("Только что");
  });

  test('От 10 секунд до минуты', () => {
    const date = new Date();
    date.setTime(date.getTime() - 1000 * 11);

    expect(format(date)).toBe("11 секунд назад");
  });

  describe('В пределах минуты', () => {
    test('21 секунду', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 21);

      expect(format(date)).toBe("21 секунду назад");
    });

    test('22 секунды', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 22);

      expect(format(date)).toBe("22 секунды назад");
    });

    test('25 секунд', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 25);

      expect(format(date)).toBe("25 секунд назад");
    });
  });

  describe('В пределах часа', () => {
    test('21 минуту', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 60 * 21);

      expect(format(date)).toBe("21 минуту назад");
    });

    test('22 минуты', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 60 * 22);

      expect(format(date)).toBe("22 минуты назад");
    });

    test('25 минут', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 60 * 25);

      expect(format(date)).toBe("25 минут назад");
    });
  });

  describe('В пределах 3 часов', () => {
    test('1 час', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 60 * 60);

      expect(format(date)).toBe("1 час назад");
    });

    test('2 часа', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 60 * 60 * 2);

      expect(format(date)).toBe("2 часа назад");
    });

    test('3 часа', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 60 * 60 * 3);

      expect(format(date)).toBe("3 часа назад");
    });

    test('4 часа', () => {
      const date = new Date();
      date.setTime(date.getTime() - 1000 * 60 * 60 * 4);

      expect(format(date)).not.toBe("4 часа назад");
    });
  });

  describe('От 3 часов и дальше', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      const systemDate = new Date();
      systemDate.setHours(15);
      systemDate.setMinutes(15);
      systemDate.setDate(15);
      systemDate.setMonth(0);
      jest.setSystemTime(systemDate);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('4 часа назад', () => {
      const date = new Date();
      date.setHours(date.getHours() - 4);

      expect(format(date)).toBe("сегодня в 11:15");
    });

    test('15 часов назад, еще сегодня', () => {
      const date = new Date();
      date.setHours(date.getHours() - 15);

      expect(format(date)).toBe("сегодня в 00:15");
    });

    test('16 часов назад, уже вчера', () => {
      const date = new Date();
      date.setHours(date.getHours() - 16);

      expect(format(date)).toBe("вчера в 23:15");
    });

    test('40 часов назад, уже позавчера', () => {
      const date = new Date();
      date.setHours(date.getHours() - 40);

      expect(format(date)).toBe("13 янв в 23:15");
    });

    test('11 месяцев назад', () => {
      const date = new Date();
      date.setMonth(date.getMonth() - 11);

      expect(format(date)).toBe("15 февр в 15:15");
    });

    test('1 год назад', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);

      expect(format(date)).toBe("15 янв 2023");
    });

    test('2 года назад', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 2);

      expect(format(date)).toBe("15 янв 2022");
    });
  });
});
