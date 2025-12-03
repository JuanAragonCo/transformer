export class IsNotAnArrayError extends Error {
  constructor() {
    super("The provided object is not a valid array");
  }
}
