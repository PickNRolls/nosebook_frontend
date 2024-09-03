export function join<T extends unknown>(arr: T[], separator: T): T[] {
  const output: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (output.length) {
      output.push(separator);
    }
    output.push(arr[i]);
  }

  return output;
}
