export function mockUuid(): string {
  return new Array(32).fill(0).map(() => (Math.ceil(Math.random() * 10)).toString()).join('')
}
