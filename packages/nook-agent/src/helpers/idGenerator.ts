export function* simpleIdGenerator(prefix: string): Generator<string, string, string> {
  let index = 0;

  while (true) {
    yield `${prefix}-${index++}`;
  }
}
