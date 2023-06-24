export const left = <L>(l: L): [L, null] => [l, null];
export const right = <R>(r: R): [null, R] => [null, r];
export const either = <L, R>(l: L, r: R): [L, R] => [l, r];
export const isLeft = <L, R>(e: [L, R]) => e[1] === null && e[0] !== null;
export const isRight = <L, R>(e: [L, R]) => e[0] === null && e[1] !== null;

export const eitherWrapper = <R>(
  promise: Promise<R>
): Promise<[Error | null, R | null]> =>
  promise.then((data) => right<R>(data)).catch((error) => left<Error>(error));
