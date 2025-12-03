export class ValueNotFoundError extends Error {
  constructor(
    public readonly key: string | undefined | null,
    public readonly objectType: string,
  ) {
    super(`Value '${key}' not found in transformer object ${objectType}`);
  }
}
