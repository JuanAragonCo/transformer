export class InvalidEnumError extends Error {
  constructor(value: unknown) {
    super(`Value '${value}' does not conform to provided Enum`);
  }
}
