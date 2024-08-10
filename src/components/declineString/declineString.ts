export const declineString = (options: {
  [1]: string;
  [2]: string;
  [5]: string;
  length: number;
}): string => {
  const remainderOfTen = options.length % 10;
  const remainderOfHundred = options.length % 100;

  if (remainderOfHundred > 10 && remainderOfHundred <= 20) {
    return options[5];
  }

  if (remainderOfTen === 1) {
    return options[1];
  }

  if (remainderOfTen > 1 && remainderOfTen < 5) {
    return options[2];
  }

  return options[5];
}

export const createDeclineString = (options: {
  [1]: string;
  [2]: string;
  [5]: string;
}) => (length: number): string => {
  return declineString({
    ...options,
    length,
  })
};
